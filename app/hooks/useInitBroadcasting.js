import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { addNotification } from '../containers/App/actions';
import { setMe } from '../containers/FreeBroadcasting/actions';
import messages from '../containers/FreeBroadcasting/messages';
import { selectRoom } from '../containers/FreeBroadcasting/selectors';
import {
  selectDisableBroadcastCam,
  selectDisableBroadcastMic,
  selectInitiator,
  selectSessionBroadcastingType,
} from '../containers/SessionPage/selectors';
import logger from '../logger';
import RoomClient from '../utils/mediasoup/RoomClient';
import { isSessionAdmin } from '../utils/permissions';
import { SHEET_TYPE_COMMON } from '../constants';
import ENV from '../../env';

/**
 *
 * @param {string} type - тип комнаты. Тип комнаты -- обычно это производное от
 * типа листа, но в данном случае -- жёстко заданная переменная, которая определяет
 * какие данные этот хук будет возвращать
 * @param {string} sheetType - тип листа
 * @param {string} sessionId
 * @param {string?} [teamId]
 * @param {object} user - объект пользователя
 * @param {string} role - роль пользователя в сессии
 * @param store - redux store
 * @return {*[]}
 */
export default function useInitBroadcasting(
  type,
  sheetType,
  sessionId,
  teamId,
  user,
  role,
  store,
) {
  const dispatch = useDispatch();

  /**
   * Здесь мы сохраняем teamId, при заходе на сессию. Если в последствии
   * пользователь будет перемещён в другие команды, то это состояние не будет
   * никак на это реагировать.
   *
   * Нам это нужно чтобы инициализировать подключение к mediasoup'у на КЛ/ИЛ
   */
  const [initializedTeamId, setInitializedTeamId] = useState(null);
  const room = useSelector(selectRoom);
  const videoChatStoreLoaded = typeof room?.state === 'string';
  const roomState = room?.state;
  const disableBroadcastCam = useSelector(selectDisableBroadcastCam);
  const disableBroadcastMic = useSelector(selectDisableBroadcastMic);
  const initiator = useSelector(selectInitiator);
  const broadcastingType = useSelector(selectSessionBroadcastingType);
  const clientRoomRef = useRef(null);

  // Перед нами стоит задача подождать пока придёт teamId, если пользователь
  // находится на командном листе, чтобы подключиться именно к команде, а не к
  // общему листу при заходе на сессию
  useFocusEffect(
    useCallback(() => {
      if (typeof sheetType === 'string') {
        if (sheetType !== SHEET_TYPE_COMMON) {
          // Если мы ещё не подключились к сессии/команде, даже не пытаться создавать
          // инстанс RoomClient
          // либо если юзера пока закинули в команду "нераспределённых", тоже ничего
          // не делаем
          if (
            !initializedTeamId &&
            typeof teamId === 'string' &&
            teamId !== 'unassigned'
          ) {
            setInitializedTeamId(teamId);
          }
          // в случае, если юзер -- админ, мы в любом случае подключаем его к
          // видео-серверу. Этого можно было бы и не делать, но тогда если на листе
          // не будет команд, то он не подключится к серверу и мы не сможем показать
          // ему уведомление о том, что ему досупно вещание на все листы пока нет
          // команд. При этом админ будет находиться на КЛ (ИЛ), но при этом будет
          // подключен к комнате сессии
          //
          //  Делаем проверку на админа здесь, потому что вне эффекта, role всё ещё
          //  может быть неопределена
          else if (!initializedTeamId && role && isSessionAdmin(role)) {
            setInitializedTeamId(true);
          }
        } else if (!initializedTeamId) {
          setInitializedTeamId(true);
        }
      }
    }, [initializedTeamId, teamId, role, sheetType]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!initializedTeamId || !sessionId) {
        return;
      }
      // Subscribe to headphones on/off event for turning off speaker on phone
      const peerId = user.id;

      const payload = {
        peerId,
        displayName: user.name,
        displayNameSet: true,
        device: {},
      };

      dispatch(setMe(payload));
      RoomClient.init({ store });
      fetch(
        `${ENV.API_HOST}:${
          ENV.API_PORT
        }/get-media/${sessionId}?webinar=${+broadcastingType.startsWith(
          'WEBINAR',
        )}`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.server && initializedTeamId) {
            clientRoomRef.current = new RoomClient({
              roomId: sessionId,
              peerId,
              baseUrl: data.server,
              displayName: user.name,
              device: {},
              svc: undefined,
              roomType: type,
              frameRate: { ideal: 10, max: 15 },
              resolution: 'qvga',
            });
            clientRoomRef.current.join(initializedTeamId);
          } else {
            logger.error(
              'useInitBroadcasting: Unable to receive video-server host url',
            );
          }
        })
        .catch((err) => {
          logger.error(err.stack);
        });

      // eslint-disable-next-line consistent-return
      return () => {
        if (clientRoomRef.current) {
          const { session } = store?.getState();
          if (!session.activeSheetId) {
            setInitializedTeamId(null);
            clientRoomRef.current.close();
          }
        }
      };
    }, [videoChatStoreLoaded, initializedTeamId, sessionId, broadcastingType]),
  );
  useEffect(() => {
    // Нам необходимо как-то передавать другим пользователям информацию о том, на
    // каком типе листи мы в данный момент находимся. При этом мы не можем сделать
    // это через процесс инициализации RoomClient, поскольку на тот момент ещё
    // может не быть получен лист и его тип со стороны бакэнда и в целом,
    // предполагается, что пользователь будет активно перемещаться по типам листов
    // в процессе работы
    if (typeof sheetType === 'string' && roomState === 'connected') {
      if (clientRoomRef.current) {
        clientRoomRef.current
          .changeSettings({
            isAdmin: isSessionAdmin(role),
            teamId: typeof teamId === 'string' ? teamId : null,
            sheetType,
          })
          .catch((err) => {
            logger.warn(err.message);
          });
      }
    }
  }, [teamId, role, sheetType, roomState]);

  useEffect(() => {
    // мы должны обязательно отслеживать state, потому что часто teamId приходит
    // ещё до того, как было установлено соединение
    if (clientRoomRef.current && roomState === 'connected') {
      clientRoomRef.current.changeRoom(teamId);
    }
  }, [teamId, roomState]);

  // Это актуально для открытых проектов, когда пользователь заходит без имени
  // и задаёт себе имя, но так же и для случаев, когда пользователь переименовывает
  // себя в процессе работы
  useEffect(() => {
    if (
      roomState === 'connected' &&
      clientRoomRef.current &&
      user?.name &&
      user.name.length &&
      // eslint-disable-next-line no-underscore-dangle
      clientRoomRef.current._displayName !== user.name
    ) {
      clientRoomRef.current.changeDisplayName(user.name);
    }
  }, [roomState, user?.name]);

  // запрет админом на выход в вещание
  useEffect(() => {
    // проверка на общий лист, и на инициатора запрета на вещание
    const check =
      clientRoomRef.current &&
      sheetType === SHEET_TYPE_COMMON &&
      initiator &&
      initiator !== user.id;

    if (check && !disableBroadcastCam && !disableBroadcastMic) {
      dispatch(
        addNotification({
          message: messages.adminEnabledYourMicAndCam,
          type: 'success',
        }),
      );
    }
  }, [disableBroadcastCam, disableBroadcastMic]);

  useEffect(() => {
    const check =
      clientRoomRef.current &&
      sheetType === SHEET_TYPE_COMMON &&
      initiator &&
      initiator !== user.id;

    if (check && disableBroadcastCam) {
      dispatch(
        addNotification({
          message: messages.adminDisabledYourCam,
          type: 'warning',
        }),
      );
    }
  }, [disableBroadcastCam]);

  useEffect(() => {
    const check =
      clientRoomRef.current &&
      sheetType === SHEET_TYPE_COMMON &&
      initiator &&
      initiator !== user.id;

    if (check && disableBroadcastMic) {
      dispatch(
        addNotification({
          message: messages.adminDisabledYourMic,
          type: 'warning',
        }),
      );
    }
  }, [disableBroadcastMic]);

  return [room, clientRoomRef];
}
