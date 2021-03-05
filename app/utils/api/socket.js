import io from 'socket.io-client';
import { buffers, eventChannel } from 'redux-saga';
import { all, call, fork, put, select, take, cps } from 'redux-saga/effects';

import { setSocketConnectError } from '../../containers/App/actions';
import logger from '../../logger';
import { getAuthToken } from '../storage';
import { store } from '../../configureStore';
import {
  closeChannel,
  createOrUpdateChannel,
  receiveSessionMessage,
  receiveProjectMessage,
  receiveUserMessage,
  receiveCourseMessage,
  receiveTeamChatMessage,
  receiveGlobalAdminMessage,
} from './actions';
import BackgroundTimer from 'react-native-background-timer';
import { Platform } from 'react-native';

// 20 секунд
const SERVER_PONG_TIME = 20000;
// ждём двое дольше прежде чем паниковать 🤣
const CONNECTION_LOSS_TIME = SERVER_PONG_TIME * 2;

const RECONNECTION_QUANTITY = 50;

// TODO: what to do when accessToken become staled?
export class SocketApi {
  static *read(channel) {
    while (true) {
      const payload = yield take(channel);
      // we decide to split messages handling by different containers for better
      // code splitting, because we have a lot of code related w/ this
      switch (payload.destination) {
        case 'session':
        case 'sheet':
        case 'user_in_session':
        case 'user_in_sheet':
        case 'user_in_teamset':
        case 'team_in_sheet':
        case 'role_in_target':
          yield put(receiveSessionMessage(payload));
          break;
        case 'project':
          yield put(receiveProjectMessage(payload));
          break;
        case 'admin':
          yield put(receiveGlobalAdminMessage(payload));
          break;
        case 'user':
          yield put(receiveUserMessage(payload));
          break;
        case 'course':
          yield put(receiveCourseMessage(payload));
          yield put(receiveSessionMessage(payload));
          break;
        case 'team_chat':
          yield put(receiveTeamChatMessage(payload));
          break;
        default:
          break;
      }
    }
  }

  constructor(params) {
    this.socket = null;
    this.channels = new Map();
    this.url = params.url;
    /**
     * Чтобы предотавраить всё новые и новые подключения, мы используем эту
     * переменную, которую меняем сразу как только метод connect вызывается
     * первый раз
     * @type {boolean}
     */
    this.inProgress = false;
    /**
     * Таймер потери соеденинения. Мы постоянно отсчитываем вермя с прошедшего
     * ивента `pong` и если оно в два раза превысило базовое время, то это
     * скорей всего значает, что мы потеряли связь с web-socket сервером
     * и должны сами инициировать переподключение
     * @type {null}
     */
    this.connectionLossTimer = null;

    this.connect = this.connect.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.closeChannel = this.closeChannel.bind(this);
    this.closeConnect = this.closeConnect.bind(this);
    this.resubscribe = this.resubscribe.bind(this);
    this.reconnectAndroidIos = this.reconnectAndroidIos.bind(this);

    this.reconnectionQuantity = 0;
  }

  /**
   *
   * @param {boolean} reconnect - язвялется ли этот вызов повторным подключением?
   */
  *connect(reconnect = false) {
    // Проверям, был ли этот метод вызван ранее. Если был, то выходим, т.к.
    // нам достаточно одного соединения
    if (this.inProgress) {
      return;
    }

    this.inProgress = true;

    const { id } = yield select((state) => state.user);

    if (typeof id !== 'string') {
      logger.warn('WebSocket API connect: user still not authorized');
      return;
    }

    const token = yield call(getAuthToken);

    this.socket = io(this.url, {
      query: {
        AUTHORIZATION: token,
        ACCOUNT_ID: id,
      },
      reconnectionAttempts: 20,
      transports: ['websocket'],
    });

    // Если была потеря подключения, мы переподключаемся и должны переподписаться
    // на все каналы
    if (typeof reconnect === 'boolean' && reconnect) {
      logger.info(
        'Websocket API connection was lost and now it is reconnected',
      );
      yield call(this.resubscribe);
    }

    yield this.reconnectChannel();
  }

  reconnectAndroidIos() {
    // при разрыве соединения, если таймер попыток
    // восстановление не был запущен - запускаем
    if (!this.connectionLossTimer) {
      const channels = Array.from(this.channels);
      // т.к. соединение потеряно, отписывается от каналов
      channels.map(([lostChannel]) =>
        store.dispatch(closeChannel(lostChannel)),
      );
      if (Platform.OS === 'ios') {
        BackgroundTimer.start();
      }
      // если в течении 5 секунд соединения не появилось,
      // выводим модалку попытки восстановление
      // также после вызова этого экшена, при возврате будет перезапрос данных на листе
      // важно что на андроид в бг происходят долисекундные разрывы,
      // в этом случаи мы просто восстанавливаем соединения без показа модалки и перезапроса данных
      let timeOut = BackgroundTimer.setTimeout(() => {
        if (!this.socket.connected) {
          store.dispatch(setSocketConnectError({ status: true }));
        }
      }, 5000);

      // каждых 500 мс пробуем восстановить соединение
      // нам это нужно для того, что бы когда андроид в бг режиме
      // принудительно отключает сокет, моментально восстановить соединения
      // что бы пользователь не терял связь с происходящим на доске
      this.connectionLossTimer = BackgroundTimer.setInterval(() => {
        if (this.reconnectionQuantity === RECONNECTION_QUANTITY) {
          BackgroundTimer.clearInterval(this.connectionLossTimer);
          store.dispatch(setSocketConnectError({ reload: true }));
          this.reconnectionQuantity = 0;
        } else {
          this.socket.connect();
          // когда с N-ой попытки появилось соединение
          // перепописываемся на каналы, очищаем все таймеры, убираем модалку
          if (this.socket.connected) {
            channels.map(([lostChannel]) =>
              store.dispatch(createOrUpdateChannel(lostChannel)),
            );
            BackgroundTimer.clearInterval(this.connectionLossTimer);
            BackgroundTimer.clearTimeout(timeOut);
            this.connectionLossTimer = null;
            store.dispatch(
              setSocketConnectError({ status: false, reload: false }),
            );
            this.reconnectionQuantity = 0;
          } else {
            this.reconnectionQuantity++;
          }
        }
      }, 500);
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }
    }
  }

  *reconnectChannel() {
    this.socket.on('disconnect', (message) => {
      logger.warn(`WebSocket API connection closed: ${message}`);
      this.reconnectAndroidIos();
    });

    this.socket.on('error', (err) => {
      logger.error(`WebSocket API error: ${err}`);
      this.reconnectAndroidIos();
    });

    this.socket.on('connect_error', (error) => {
      if (error.description?.message) {
        logger.error(
          `Websocket API description message: ${error.description.message}`,
        );
      }
      if (error.stack) {
        logger.error(`Websocket API connection error: ${error.stack}`);
      }
      this.reconnectAndroidIos();
    });
  }

  *createChannel({ payload }) {
    if (!this.socket || !this.socket.connected) {
      yield cps(this.connect);
    }

    const { channel: channelName } = payload;

    if (this.channels.has(channelName)) {
      logger.warn(
        `WebSocket API createChannel: connection to this channel "${channelName}" already established. Skipping...`,
      );
      return;
    }

    const channel = yield call(this.createEventChannel, channelName);
    // Сохраняем название нового канала, чтобы предотвратить его дублирование.
    // Второй аргумент `true` добавлен просто так, потому что он обязателен.
    // Мы бы могли передать туда и сам канал, но нам пока это не нужно
    this.channels.set(channelName, true);

    yield fork(SocketApi.read, channel);

    try {
      yield take((action) => {
        if (action.type === closeChannel.toString()) {
          if (action.payload.channel === channelName) {
            return true;
          }
        }
        return false;
      });
    } finally {
      channel.close();
      this.channels.delete(channelName);
    }
  }

  *closeChannel({ payload }) {
    const { channel } = payload;
    if (this.socket) {
      this.socket.emit('unsubscribe', channel);
      console.log('unsubscribe', channel);
    }
  }

  createEventChannel = (channel) => {
    if (this.socket) {
      this.socket.emit('subscribe', channel);
      console.log('subscribe', channel);
    } else {
      console.log('subscribe fail');
    }

    const subscribe = (emitter) => {
      if (this.socket) {
        this.socket.on(`message.${channel}`, emitter);
        this.socket.on(`message.${channel}`, (event) => {
          console.log('event', event);
        });
      } else {
        console.log('message fail');
      }
      return () => {
        this.socket.off(`message.${channel}`, emitter);
        this.socket.removeListener(channel, emitter);
      };
    };

    // Буфер добавлен в экспериментальном режиме. Возможно лимиты или тип буфера
    // нужно будет подгонять по ходу тестов
    // @see https://redux-saga.js.org/docs/api/
    return eventChannel(subscribe, buffers.expanding(20));
  };

  *closeConnect() {
    this.socket?.close();
    this.inProgress = false;
    this.channels.clear();
  }

  /**
   * Переподключаемся ко всем каналам
   */
  *resubscribe() {
    const channels = Array.from(this.channels);
    // Сначала отпысываемся от всех потерянных каналов
    yield all(channels.map(([lostChannel]) => put(closeChannel(lostChannel))));
    // Затем подписываемся заново
    yield all(
      channels.map(([lostChannel]) => put(createOrUpdateChannel(lostChannel))),
    );
  }
}
