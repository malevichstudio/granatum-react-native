import protooClient from 'protoo-client';
import * as mediasoupClient from 'mediasoup-client';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import logger from '../../logger';
import * as actions from '../../containers/FreeBroadcasting/actions';
import { addNotification } from '../../containers/App/actions';
import messages from '../../containers/FreeBroadcasting/messages';
import { getProtooUrl } from './urlFactory';

const VIDEO_CONSTRAINS = {
  qvga: {
    width: { ideal: 320 },
    height: { ideal: 240 },
    // frameRate: { ideal: 10, max: 15 },
  },
  vga: {
    width: { ideal: 640 },
    height: { ideal: 480 },
    // frameRate: { ideal: 10, max: 15 },
  },
  hd: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    // frameRate: { ideal: 10, max: 15 },
  },
};

const VIDEO_SIMULCAST_ENCODINGS = [
  { scaleResolutionDownBy: 4 },
  { scaleResolutionDownBy: 2 },
  { scaleResolutionDownBy: 1 },
];

// Used for VP9 desktop sharing.
const VIDEO_SVC_ENCODINGS = [{ scalabilityMode: 'S3T3', dtx: true }];

// Used for VP9 webcam video.
const VIDEO_KSVC_ENCODINGS = [{ scalabilityMode: 'S3T3_KEY' }];

let store = null;

const micProducerError =
  'MicProducer not ready yet. Is microphone device attached?';

/* eslint-disable */
export default class RoomClient {
  /**
   * @param  {Object} data
   * @param  {Object} data.store - The Redux store.
   */
  static init(data) {
    store = data.store;
  }

  constructor({
    roomId,
    peerId,
    baseUrl,
    displayName,
    device,
    useSimulcast = false,
    useSharingSimulcast = false,
    forceTcp = false,
    consume = true,
    forceH264 = false,
    forceVP9 = false,
    svc,
    roomType,
    isWebinar = false,
    frameRate = { ideal: 10, max: 15 },
    resolution = 'vga',
  }) {
    /**
     * Closed flag.
     * @type {boolean}
     * @private
     */
    this._closed = false;
    this._activeSpeakerTimer = null;

    /**
     * Display name.
     * @type {String}
     * @private
     */
    this._displayName = displayName;

    /**
     * Device info.
     * @type {Object}
     * @private
     */
    this._device = device;

    /**
     * Whether we want to force RTC over TCP.
     * @type {Boolean}
     * @private
     */
    this._forceTcp = forceTcp;

    /**
     * Whether we should consume.
     * @type {Boolean}
     * @private
     */
    this._consume = consume;

    /**
     * Force H264 codec for sending.
     * @type {boolean}
     * @private
     */
    this._forceH264 = Boolean(forceH264);

    /**
     * Force VP9 codec for sending.
     * @type {boolean}
     * @private
     */
    this._forceVP9 = Boolean(forceVP9);

    /**
     * Whether simulcast should be used.
     * @type {Boolean}
     * @private
     */
    this._useSimulcast = useSimulcast;

    /**
     * Whether simulcast should be used in desktop sharing.
     * @type {Boolean}
     * @private
     */
    this._useSharingSimulcast = useSharingSimulcast;

    /**
     * true, если это режим Вебинара
     * @type {*|boolean}
     * @private
     */
    this._isWebinar = isWebinar;

    /**
     * Protoo URL.
     * @type {String}
     * @private
     */
    this._protooUrl = getProtooUrl({
      host: baseUrl,
      roomId,
      peerId,
      forceH264,
      forceVP9,
      isWebinar,
    });

    /**
     * protoo-client Peer instance.
     * @type {protooClient.Peer | null}
     * @private
     */
    this._protoo = null;

    /**
     * mediasoup-client Device instance.
     * @type {mediasoupClient.Device | null}
     * @private
     */
    this._mediasoupDevice = null;

    /**
     * mediasoup Transport for sending.
     * @type {mediasoupClient.Transport | null}
     * @private
     */
    this._sendTransport = null;

    /**
     * mediasoup Transport for receiving.
     * @type {mediasoupClient.Transport | null}
     * @private
     */
    this._recvTransport = null;

    /**
     * Local mic mediasoup Producer.
     * @type {mediasoupClient.Producer | null}
     * @private
     */
    this._micProducer = null;

    /**
     * Local webcam mediasoup Producer.
     * @type {mediasoupClient.Producer | null}
     * @private
     */
    this._webcamProducer = null;

    /**
     * Local share mediasoup Producer.
     * @type {mediasoupClient.Producer | null}
     * @private
     */
    this._shareProducer = null;

    /**
     * mediasoup Consumers.
     * @type {Map<String, mediasoupClient.Consumer>}
     * @private
     */
    this._consumers = new Map();

    /**
     * Map of webcam MediaDeviceInfos indexed by deviceId.
     * @type {Map<String, MediaDeviceInfos>}
     * @private
     */
    this._webcams = new Map();

    /**
     * Local Webcam.
     * @type {{device: MediaDeviceInfo, resolution: 'qvga' | 'vga' | 'hd'}}
     * @private
     */
    this._webcam = {
      device: null,
      resolution,
    };

    /**
     * Мы можем кастомизировать FPS через эту переменную
     * @type {{}}
     * @private
     */
    this._frameRate = frameRate;

    this._consumerClosed = [];

    /**
     * Тип комнаты: сессия/команда
     * @type {string}
     */
    this._roomType = roomType;

    /**
     * Таймаут хака, который играет 3 минуты. В случае, если пользователь уйдёт
     * раньше, мы должны очистить таймаут
     * @type {number | null}
     * @private
     */
    this._hackPlayback = null;

    // Set custom SVC scalability mode.
    if (svc) {
      VIDEO_SVC_ENCODINGS[0].scalabilityMode = svc;
      VIDEO_KSVC_ENCODINGS[0].scalabilityMode = `${svc}_KEY`;
    }

    this._micDeviceId = null;
    this._camDeviceId = null;

    // Проверка наличия ранее использованого микрофона
    // if (window.localStorage.getItem('micDeviceId')) {
    //   navigator.mediaDevices.enumerateDevices().then(devices => {
    //     for (const device of devices) {
    //       if (device.kind !== 'audioinput') {
    //         continue;
    //       }
    //       if (window.localStorage.getItem('micDeviceId') === device.deviceId) {
    //         this._micDeviceId = device.deviceId;
    //         break;
    //       }
    //     }
    //     if (!this._micDeviceId) {
    //       window.localStorage.removeItem('micDeviceId');
    //     }
    //   });
    // }
    //
    // // Проверка наличия ранее использованой камеры
    // if (window.localStorage.getItem('camDeviceId')) {
    //   navigator.mediaDevices.enumerateDevices().then(devices => {
    //     for (const device of devices) {
    //       if (device.kind !== 'videoinput') {
    //         continue;
    //       }
    //       if (window.localStorage.getItem('camDeviceId') === device.deviceId) {
    //         this._camDeviceId = device.deviceId;
    //         break;
    //       }
    //     }
    //     if (!this._camDeviceId) {
    //       window.localStorage.removeItem('camDeviceId');
    //     }
    //   });
    // }
  }

  close() {
    if (this._closed) return;

    this._closed = true;

    // Close protoo Peer
    this._protoo.close();

    // Close mediasoup Transports.
    if (this._sendTransport) this._sendTransport.close();

    if (this._recvTransport) this._recvTransport.close();

    store.dispatch(this.setAction().setRoomState('closed'));

    // if (this._hackPlayback) {
    //   clearTimeout(this._hackPlayback);
    // }
  }

  async join(teamId, autoOnMicAndCam = false) {
    const protooTransport = new protooClient.WebSocketTransport(
      this._protooUrl,
    );

    this._protoo = new protooClient.Peer(protooTransport);

    store.dispatch(this.setAction().setRoomState('connecting'));

    this._protoo.on('open', () => {
      // Пинг
      const ping = () => {
        if (protooTransport._ws.readyState === 1) {
          protooTransport._ws.send('2');
          if (Platform.OS === 'ios') {
            BackgroundTimer.start();
          }
          BackgroundTimer.setTimeout(ping, 8000);
          if (Platform.OS === 'ios') {
            BackgroundTimer.stop();
          }
        }
      };
      if (Platform.OS === 'ios') {
        BackgroundTimer.start();
      }
      BackgroundTimer.setTimeout(ping, 8000);
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }

      this._joinRoom(teamId, autoOnMicAndCam);
    });

    this._protoo.on('failed', () => {
      logger.warn('Video-chat: webSocket connection failed');
    });

    this._protoo.on('disconnected', () => {
      store.dispatch(
        addNotification({
          message: messages.restoringConnection,
          type: 'error',
        }),
      );

      logger.info('Video-chat: webSocket disconnected');
      // Close mediasoup Transports.
      if (this._sendTransport) {
        this._sendTransport.close();
        this._sendTransport = null;
      }

      if (this._recvTransport) {
        this._recvTransport.close();
        this._recvTransport = null;
      }

      store.dispatch(this.setAction().setRoomState('closed'));
    });

    this._protoo.on('close', () => {
      if (this._closed) return;

      this.close();
    });

    this._protoo.on('request', async (request, accept, reject) => {
      switch (request.method) {
        case 'pong': {
          await this._protoo.request('ping');
          accept();
          break;
        }

        case 'newConsumer': {
          if (!this._consume) {
            reject(403, 'I do not want to consume');

            break;
          }

          const {
            peerId,
            producerId,
            id,
            kind,
            rtpParameters,
            type,
            appData,
            producerPaused,
          } = request.data;

          let codecOptions;

          if (kind === 'audio') {
            codecOptions = {
              opusStereo: 1,
            };
          }

          const consumer = await this._recvTransport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions,
            appData: { ...appData, peerId }, // Trick.
          });

          if (this._consumerClosed.includes(request.data.id)) {
            reject(403, `The consumer "${request.data.id}" already closed`);
            break;
          }

          // Store in the map.
          this._consumers.set(consumer.id, consumer);

          consumer.on('transportclose', () => {
            this._consumers.delete(consumer.id);
          });

          const {
            spatialLayers,
            temporalLayers,
          } = mediasoupClient.parseScalabilityMode(
            consumer.rtpParameters.encodings[0].scalabilityMode,
          );

          const payload = {
            // передаём все данные по юзеру, и переменную `share: true`
            ...appData,
            id: consumer.id,
            type: type,
            // не ставим шаринг экрана на паузу
            locallyPaused: false,
            remotelyPaused: producerPaused,
            rtpParameters: consumer.rtpParameters,
            spatialLayers: spatialLayers,
            temporalLayers: temporalLayers,
            preferredSpatialLayer: spatialLayers - 1,
            preferredTemporalLayer: temporalLayers - 1,
            priority: 1,
            codec: consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
            track: consumer.track,
            producerId,
          };

          // на мобилке нам не нужен аудио консюмер в стейте
          store.dispatch(this.setAction().addConsumer(payload, peerId));

          // We are ready. Answer the protoo request so the server will
          // resume this Consumer (which was paused for now).
          accept();

          // if (consumer.kind === 'video' && !appData.share) {
          //   consumer.pause();
          // } else {
          //   accept();
          // }
          break;
        }

        case 'closeProducer':
          // пока что нам это нужно только для форсированного закрытия продьюсера
          // шаринга экрана, поэтому мы прямо его и пытаемся закрыть
          if (
            this._shareProducer &&
            request.data.producerId === this._shareProducer.id
          ) {
            this._shareProducer.close();
            this._shareProducer = null;

            store.dispatch(
              this.setAction().removeProducer(request.data.producerId),
            );

            accept();
          }
          break;
      }
    });

    this._protoo.on('notification', (notification) => {
      switch (notification.method) {
        case 'producerScore': {
          const { producerId, score } = notification.data;

          store.dispatch(this.setAction().setProducerScore(producerId, score));

          break;
        }

        case 'newPeer': {
          const peer = notification.data;
          const payload = { ...peer, consumers: [] };
          this.addPeer(payload);
          break;
        }

        case 'peerClosed': {
          const { peerId } = notification.data;
          const { pinned, speaker } = store.getState().session?.session;

          // Нужно понять в какой объект будем добавлять пира:
          // спикер/прикреплённые/все остальные
          if (speaker && peerId === speaker.id) {
            store.dispatch(actions.removeSpeakerPeer(peerId));
          } else if (pinned.some((user) => user.id === peerId)) {
            store.dispatch(actions.removePinnedPeer(peerId));
          } else {
            store.dispatch(actions.removePeer(peerId));
          }

          break;
        }

          // Приходит, когда какой-то пользователь включил камеру/микрофон
        case 'consumerTrackReplaced': {
          const { peerId, consumerId /*, share*/ } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (consumer) {
            if (consumer._paused) {
              // Маркируем консумер, как не находящийся на паузе
              consumer._paused = false;
              this._consumers.set(consumerId, consumer);
            }

            const payload = {
              // передаём все данные по юзеру, и переменную `share: true`
              ...consumer._appData,
              id: consumer.id,
              locallyPaused: false,
              remotelyPaused: false,
              rtpParameters: consumer.rtpParameters,
              priority: 1,
              codec: consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
              track: consumer.track,
              producerId: consumer._producerId,
            };

            store.dispatch(this.setAction().addConsumer(payload, peerId));
          }
          break;
        }

        case 'consumerTrackClosed': {
          const { peerId, consumerId /*, share*/ } = notification.data;

          if (this._consumers.has(consumerId)) {
            const consumer = this._consumers.get(consumerId);
            // Маркируем консумер, как поставленный на паузу
            consumer._paused = true;
            this._consumers.set(consumerId, consumer);

            store.dispatch(this.setAction().removeConsumer(consumerId, peerId));
          }
          break;
        }

        case 'peerSettingsChanged':
          store.dispatch(
            this.setAction().changePeerSettings(notification.data),
          );
          break;

        case 'peerDisplayNameChanged': {
          const { peerId, displayName } = notification.data;

          store.dispatch(
            this.setAction().setPeerDisplayName(displayName, peerId),
          );

          break;
        }

        case 'consumerClosed': {
          const { consumerId } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) return;

          const { peerId } = consumer.appData;

          store.dispatch(this.setAction().removeConsumer(consumerId, peerId));

          this._consumers.delete(consumerId);
          consumer.close();
          this._consumerClosed.push(consumerId);
          if (Platform.OS === 'ios') {
            BackgroundTimer.start();
          }
          BackgroundTimer.setTimeout(() => {
            this._consumerClosed = this._consumerClosed.filter(
              (id) => id !== consumerId,
            );
          }, 5000);
          if (Platform.OS === 'ios') {
            BackgroundTimer.stop();
          }
          break;
        }

        case 'consumerMoved': {
          const {
            consumerId,
            peerId,
            producerPaused,
            type,
          } = notification.data;

          if (this._consumers.has(consumerId)) {
            const consumer = this._consumers.get(consumerId);

            // const {
            //   spatialLayers,
            //   temporalLayers,
            // } = mediasoupClient.parseScalabilityMode(
            //     consumer.rtpParameters.encodings[0].scalabilityMode,
            // );
            // TODO: проверять есть ли консумер в сторе и вставлять из this.comsumers
            const payload = {
              // передаём все данные по юзеру, и переменную `share: true`
              ...consumer._appData,
              id: consumer.id,
              type: type,
              locallyPaused: false,
              remotelyPaused: producerPaused,
              rtpParameters: consumer.rtpParameters,
              priority: 1,
              codec: consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
              track: consumer.track,
              producerId: consumer._producerId,
            };

            store.dispatch(this.setAction().addConsumer(payload, peerId));
          }

          // We are ready. Answer the protoo request so the server will
          // resume this Consumer (which was paused for now).
          // accept();
          break;
        }

        case 'consumerPaused': {
          const { consumerId } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) break;

          store.dispatch(
            this.setAction().setConsumerPaused(consumerId, 'remote'),
          );

          break;
        }

        case 'consumerResumed': {
          const { consumerId } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) break;

          store.dispatch(
            this.setAction().setConsumerResumed(consumerId, 'remote'),
          );

          break;
        }

        case 'consumerLayersChanged': {
          const { consumerId, spatialLayer, temporalLayer } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) break;

          store.dispatch(
            this.setAction().setConsumerCurrentLayers(
              consumerId,
              spatialLayer,
              temporalLayer,
            ),
          );

          break;
        }

        case 'consumerScore': {
          // const { consumerId, score } = notification.data;
          //
          // store.dispatch(actions.setConsumerScore(consumerId, score));

          break;
        }

        case 'activeSpeaker': {
          const { peerId } = notification.data;
          // console.log('peerId', peerId)
          this.id = peerId;

          const { videoChat } = store.getState();
          const { activeSpeakerId } = videoChat.room;

          if (!peerId && !this._activeSpeakerTimer) {
            if (Platform.OS === 'ios') {
              BackgroundTimer.start();
            }
            this._activeSpeakerTimer = BackgroundTimer.setTimeout(() => {
              if (this._activeSpeakerTimer) {
                if (!this.id) {
                  // console.log('очистка', this.id);
                  store.dispatch(actions.setRoomActiveSpeaker(null));
                }
                // console.log('стоп 1');
                BackgroundTimer.clearTimeout(this._activeSpeakerTimer);
                this._activeSpeakerTimer = null;
              }
            }, 8000);
            if (Platform.OS === 'ios') {
              BackgroundTimer.stop();
            }
          }

          if (peerId && activeSpeakerId !== peerId) {
            if (this._activeSpeakerTimer) {
              // console.log('стоп 2');
              clearTimeout(this._activeSpeakerTimer);
              this._activeSpeakerTimer = null;
            }
            store.dispatch(actions.setRoomActiveSpeaker(peerId));
          }
          break;
        }

        default: {
          logger.warn(
            'unknown protoo notification.method "%s"',
            notification.method,
          );
        }
      }
    });
  }

  /**
   * Перейти в другую команату сессии. Это можно быть команда, либо наоборот --
   * общий лист
   *
   * @param roomId
   */
  changeRoom(roomId = null) {
    this._protoo.request('changeGroupID', { groupId: roomId }).catch((err) => {
      logger.error(`changeRoom: ${err.stack || err.message || err}`);
    });
  }

  /**
   * Начать вещание на все комнаты внутри сессии
   */
  broadcastAll() {
    this._protoo.request('addPeerToAllGroupIDs').catch((err) => {
      logger.error(`broadcastAll: ${err.stack || err.message || err}`);
    });
  }

  /**
   * Завершить вещание на все комнаты
   */
  broadcastAllStop() {
    this._protoo.request('removePeerToAllGroupIDs').catch((err) => {
      logger.error(`broadcastAllStop: ${err.stack || err.message || err}`);
    });
  }

  async enableMic() {
    if (this._micProducer) return;

    if (!this._mediasoupDevice || !this._mediasoupDevice.canProduce('audio')) {
      logger.warn('enableMic: cannot produce audio');

      return;
    }

    let track;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: this._micDeviceId
          ? { deviceId: { exact: this._micDeviceId } }
          : true,
        echoCancellation: false,
      });
      track = stream.getAudioTracks()[0];

      if (!this._sendTransport) {
        throw new Error('Transport not yet ready');
      }

      this._micProducer = await this._sendTransport.produce({
        track,
        codecOptions: {
          opusStereo: 1,
          opusDtx: 1,
        },
      });

      const payload = {
        id: this._micProducer.id,
        paused: this._micProducer.paused,
        track: this._micProducer.track,
        rtpParameters: this._micProducer.rtpParameters,
        codec: this._micProducer.rtpParameters.codecs[0].mimeType.split('/')[1],
      };
      store.dispatch(this.setAction().addProducer(payload));

      this._micProducer.on('transportclose', () => {
        logger.info('Microphone disconnected by transportclose');
        this._micProducer = null;
      });

      this._micProducer.on('trackended', () => {
        logger.info('Microphone disconnected by trackended');
        store.dispatch(
          addNotification({
            message: messages.micDisconnect,
            type: 'warning',
          }),
        );
        this.disableMic().catch((err) => {
          logger.error(`disableMic: ${err.stack || err.message || err}`);
        });
      });
    } catch (error) {
      console.log(error);
      if (error && /permission/.test(error.toString().toLowerCase())) {
        this.changeSettings({
          micPermission: false,
        });
        store.dispatch(
          addNotification({
            message: messages.micPermissionErrorText,
            type: 'warning',
          }),
        );
      } else {
        this.changeSettings({
          canSendMic: false,
        });
        store.dispatch(
          addNotification({
            message: messages.micEnableError,
            type: 'warning',
          }),
        );
      }

      if (error.message) {
        logger.warn('enableMic:', error.message);
      }
      if (error.stack) {
        logger.warn('enableMic:', error.stack);
      }

      if (track) track.stop();
    }
  }

  async disableMic() {
    if (!this._micProducer) {
      logger.warn(`disableMic: ${micProducerError}`);
      return;
    }

    this._micProducer.close();

    store.dispatch(this.setAction().removeProducer(this._micProducer.id));

    try {
      await this._protoo.request('closeProducer', {
        producerId: this._micProducer.id,
      });
    } catch (error) {
      store.dispatch(
        addNotification({
          message: messages.micDisableError,
          type: 'error',
        }),
      );
      logger.error(
        `Error closing server-side mic Producer: ${
          error.stack || error.message || error
        }`,
      );
    }

    this._micProducer = null;
  }

  async muteMic() {
    if (!this._micProducer) {
      logger.warn(`muteMic: ${micProducerError}`);
      return;
    }

    this._micProducer.pause();

    try {
      await this._protoo.request('pauseProducer', {
        producerId: this._micProducer.id,
      });

      store.dispatch(this.setAction().setProducerPaused(this._micProducer.id));
    } catch (error) {
      logger.error(`muteMic: ${error.stack || error.message || error}`);
    }
  }

  async unmuteMic() {
    if (!this._micProducer) {
      logger.warn(`unmuteMic: ${micProducerError}`);
      return;
    }

    this._micProducer.resume();

    try {
      await this._protoo.request('resumeProducer', {
        producerId: this._micProducer.id,
      });

      store.dispatch(this.setAction().setProducerResumed(this._micProducer.id));
    } catch (error) {
      store.dispatch(
        addNotification({
          message: messages.micEnableError,
          type: 'error',
        }),
      );
      logger.error(
        `unmuteMic | failed: ${error.stack || error.message || error}`,
      );
    }
  }

  async enableWebcam() {
    if (this._webcamProducer) {
      logger.warn(
        'enableWebcam | failed: WebcamProvider not ready yet. Is camera device attached?',
      );
      return;
    }

    if (!this._mediasoupDevice || !this._mediasoupDevice.canProduce('video')) {
      logger.warn('enableWebcam | cannot produce video');

      return;
    }

    let track;
    let device;

    store.dispatch(this.setAction().setWebcamInProgress(true));

    try {
      await this._updateWebcams();
      device = this._webcam.device;

      const { resolution } = this._webcam;

      if (!device) {
        this.changeSettings({
          canSendWebcam: false,
        });
        throw new Error('no webcam devices');
      }

      let deviceId;

      if (this._camDeviceId) {
        deviceId = { exact: this._camDeviceId };
      }
      // если ещё не дали доступ к камере то в хроме deviceId бедет пустой стокой
      // и мы не сможем включить камеру с таким айдишником
      else if (device.deviceId?.length) {
        deviceId = { exact: device.deviceId };
      }
      // поэтому, в таком случае мы используем это vvv
      else {
        deviceId = 'default';
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId,
          ...VIDEO_CONSTRAINS[resolution],
          frameRate: this._frameRate,
        },
      });

      track = stream.getVideoTracks()[0];

      if (!this._sendTransport) {
        throw new Error('Transport not yet ready');
      }

      if (this._useSimulcast) {
        // If VP9 is the only available video codec then use SVC.
        const firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.kind === 'video',
        );

        let encodings;

        if (firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') {
          encodings = VIDEO_KSVC_ENCODINGS;
        } else {
          encodings = VIDEO_SIMULCAST_ENCODINGS;
        }

        this._webcamProducer = await this._sendTransport.produce({
          track,
          encodings,
          codecOptions: {
            videoGoogleStartBitrate: 1000,
          },
        });
      } else {
        this._webcamProducer = await this._sendTransport.produce({
          track,
          encodings: [
            {
              maxBitrate: 400000,
            },
          ],
        });
      }
      const payload = {
        id: this._webcamProducer.id,
        deviceLabel: device.label.toLowerCase(),
        type: this._getWebcamType(device),
        paused: this._webcamProducer.paused,
        track: this._webcamProducer.track,
        rtpParameters: this._webcamProducer.rtpParameters,
        codec: this._webcamProducer.rtpParameters.codecs[0].mimeType.split(
          '/',
        )[1],
      };
      store.dispatch(this.setAction().addProducer(payload));

      this._webcamProducer.on('transportclose', () => {
        this._webcamProducer = null;
      });

      this._webcamProducer.on('trackended', () => {
        logger.info('Webcam disconnected!');
        store.dispatch(
          addNotification({
            message: messages.camDisconnect,
            type: 'warning',
          }),
        );
        this.disableWebcam().catch(() => {});
      });
    } catch (error) {
      if (error && /permission/.test(error.toString().toLowerCase())) {
        this.changeSettings({
          camPermission: false,
        });
      } else {
        this.changeSettings({
          canSendWebcam: false,
        });
      }

      try {
        const message = JSON.parse(error.message);
        store.dispatch(
          addNotification({
            message: { id: message.error },
            type: 'error',
          }),
        );
      } catch (e) {
        store.dispatch(
          addNotification({
            message: messages.camEnableError,
            type: 'warning',
          }),
        );
      }

      if (error.message) {
        logger.warn(`enableWebcam: ${error.message}`);
      } else if (error.name) {
        logger.warn(`enableWebcam: ${error.name}`);
      }

      if (error.stack) {
        logger.error(error.stack);
      }

      if (track) track.stop();
    } finally {
      store.dispatch(this.setAction().setWebcamInProgress(false));
    }
  }

  async disableWebcam() {
    if (!this._webcamProducer) {
      // это означает, что видео небыло включено
      return false;
    }

    this._webcamProducer.close();

    store.dispatch(this.setAction().removeProducer(this._webcamProducer.id));

    try {
      await this._protoo.request('closeProducer', {
        producerId: this._webcamProducer.id,
      });
    } catch (error) {
      store.dispatch(
        addNotification({
          message: messages.camDisableError,
          type: 'error',
        }),
      );
      logger.error(
        `Error closing server-side webcam Producer: ${
          error.stack || error.message || error
        }`,
      );
    }

    this._webcamProducer = null;

    // это означает, что видео было включено и мы выключили его
    return true;
  }

  async changeWebcam() {
    await this.disableWebcam();

    try {
      await this._updateWebcams();

      const array = Array.from(this._webcams.keys());
      const len = array.length;
      const deviceId = this._webcam.device
        ? this._webcam.device.deviceId
        : undefined;
      // смотрим, является ли текущая камера фронтальной
      const isFront = this._checkIsDeviceFront(this._webcam.device);
      // id камеры, расположенной с противоположной стороны
      let oppositeDeviceId;

      this._webcams.forEach((device, id) => {
        if (id !== deviceId) {
          // тоже смотрим, является ли данная камера фронтальной
          const isDeviceFront = this._checkIsDeviceFront(device);
          // если эта камера по типу отличается от текущей, то мы выбираем её
          if (isFront !== isDeviceFront) {
            oppositeDeviceId = id;
          }
        }
      });

      if (typeof oppositeDeviceId === 'string') {
        this._webcam.device = this._webcams.get(oppositeDeviceId);
      }
      // фоллбек на старую логику, если не нашли противоположную камеру
      else {
        let idx = array.indexOf(deviceId);

        if (idx < len - 1) {
          idx++;
        } else {
          idx = 0;
        }

        this._webcam.device = this._webcams.get(array[idx]);
      }

      // Reset video resolution to VGA.
      // this._webcam.resolution = 'vga';

      if (!this._webcam.device) {
        throw new Error('no webcam devices');
      }

      await this.enableWebcam();
    } catch (error) {
      logger.error(`changeWebcam | failed: ' ${error}`);
    }
  }

  /**
   * Начать шарить экран
   */
  enableShare() {
    if (this._shareProducer || !navigator.mediaDevices.getDisplayMedia) {
      return;
    } //  else if (this._webcamProducer) await this.disableWebcam();

    if (!this._mediasoupDevice.canProduce('video')) {
      logger.error('enableShare: cannot produce video');

      return;
    }

    let track;

    store.dispatch(this.setAction().setShareInProgress(true));

    navigator.mediaDevices
      .getDisplayMedia({
        audio: false,
        video: {
          displaySurface: 'monitor',
          logicalSurface: true,
          cursor: true,
          width: { max: 1920 },
          height: { max: 1080 },
          frameRate: { max: 30 },
        },
      })
      .then((stream) => {
        // May mean cancelled (in some implementations).
        if (!stream) {
          throw new Error('Screen sharing stream was not received');
        }

        track = stream.getVideoTracks()[0];

        let encodings;
        let codec;
        const codecOptions = {
          videoGoogleStartBitrate: 1000,
        };

        if (this._forceH264) {
          codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.mimeType.toLowerCase() === 'video/h264',
          );

          if (!codec) {
            throw new Error(
              'desired H264 codec+configuration is not supported',
            );
          }
        } else if (this._forceVP9) {
          codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.mimeType.toLowerCase() === 'video/vp9',
          );

          if (!codec) {
            throw new Error('desired VP9 codec+configuration is not supported');
          }
        }

        if (this._useSharingSimulcast) {
          // If VP9 is the only available video codec then use SVC.
          const firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.kind === 'video',
          );

          if (
            (this._forceVP9 && codec) ||
            firstVideoCodec.mimeType.toLowerCase() === 'video/vp9'
          ) {
            encodings = VIDEO_SVC_ENCODINGS;
          } else {
            encodings = VIDEO_SIMULCAST_ENCODINGS.map((encoding) => ({
              ...encoding,
              dtx: true,
            }));
          }
        }

        const { avatar, color, name } = store.getState().user;

        if (!this._sendTransport) {
          throw new Error('Transport not yet ready');
        }

        return this._sendTransport.produce({
          track,
          encodings,
          codecOptions,
          codec,
          appData: {
            share: true,
            avatar,
            color,
            name,
          },
        });
      })
      .then((shareProducer) => {
        this._shareProducer = shareProducer;

        const payload = {
          id: this._shareProducer.id,
          type: 'share',
          paused: this._shareProducer.paused,
          track: this._shareProducer.track,
          rtpParameters: this._shareProducer.rtpParameters,
          codec: this._shareProducer.rtpParameters.codecs[0].mimeType.split(
            '/',
          )[1],
        };

        store.dispatch(this.setAction().addProducer(payload));

        this._shareProducer.on('transportclose', () => {
          this._shareProducer = null;
        });

        this._shareProducer.on('trackended', () => {
          logger.info('Share disconnected!');

          this.disableShare().catch((err) => {
            logger.error(err);
          });
        });
      })
      .catch((error) => {
        logger.error(`enableShare: ${error}`);

        if (error.name !== 'NotAllowedError') {
          logger.error(`Error sharing: ${error}`);
        }

        if (track) track.stop();
      })
      .finally(() => {
        store.dispatch(this.setAction().setShareInProgress(false));
      });
  }

  disableShare() {
    if (!this._shareProducer) {
      return;
    }

    this._shareProducer.close();

    store.dispatch(this.setAction().removeProducer(this._shareProducer.id));

    this._protoo
      .request('closeProducer', {
        producerId: this._shareProducer.id,
      })
      .catch((err) => {
        store.dispatch(
          addNotification({
            message: messages.shareDisableError,
            type: 'error',
          }),
        );
        logger.error('Error closing server-side share Producer:', err.stack);
      })
      .finally(() => {
        this._shareProducer = null;
      });
  }

  // TODO: пока что метод не рабочий
  stopRemoteSharing(peerId, producerId) {
    this._protoo
      .request('closeProducerById', { peerId, producerId })
      .catch((err) => {
        logger.error('Error closing remote share Producer:', err.stack);
      });
  }

  async muteAudio() {
    store.dispatch(this.setAction().setAudioMutedState(true));
  }

  async unmuteAudio() {
    store.dispatch(this.setAction().setAudioMutedState(false));
  }

  async changeDisplayName(displayName) {
    try {
      await this._protoo.request('changeDisplayName', { displayName });

      this._displayName = displayName;

      store.dispatch(this.setAction().setDisplayName(displayName));
    } catch (error) {
      logger.error(
        `changeDisplayName | failed: ${error.stack || error.message || error}`,
      );
    }
  }

  /**
   * Этот метод проверяет подключена ли камера и есть ли к ней доступ
   * @return {Promise<void>}
   */
  checkWebCam() {
    const dispatchDisableAction = (webCamState, settings) => {
      const payload = { canSendWebcam: webCamState };
      store.dispatch(this.setAction().setMediaCapabilities(payload));
      store.dispatch(actions.changeMeSettings(settings));
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => stream.getTracks().forEach((track) => track.stop()))
      .then(() => {
        // если сюда заходит, то значит камера работает нормально
        const videoChat = store.getState().videoChat;

        if (!videoChat.me.canSendWebcam) {
          const payload = { canSendWebcam: true, camPermission: true };
          dispatchDisableAction(true, payload);
          this.changeSettings(payload);
        }
      })
      .catch((err) => {
        if (err) {
          if (err.name === 'NotAllowedError') {
            const payload = { camPermission: false };
            dispatchDisableAction(false, payload);
            this.changeSettings(payload);
          } else if (err.name === 'NotFoundError') {
            const payload = { canSendWebcam: false };
            dispatchDisableAction(false, payload);
            this.changeSettings(payload);
          }
        }
      });
  }

  /**
   * Когда пользователь заходит на лист, он по умолчанию не становится продьюсером.
   * Мы делаем его продьюсером, только тогда, когда он включает либо камеру, либо
   * микрофон. Этот метод используется и для первого и для второго
   */
  startProducing() {
    // Если транспорт уже инициализирован, ничего не нужно делать
    // Такое бывает, если пользователь до этого уже влючил либо звук, либо
    // видео
    if (this._sendTransport) {
      return Promise.resolve();
    }

    return this._protoo
      .request('createWebRtcTransport', {
        forceTcp: this._forceTcp,
        producing: true,
        consuming: false,
      })
      .then((transportInfo) => {
        const {
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        } = transportInfo;

        this._sendTransport = this._mediasoupDevice.createSendTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        });

        this._sendTransport.on(
          'connect',
          ({ dtlsParameters }, callback, errback) => {
            this._protoo
              .request('connectWebRtcTransport', {
                transportId: this._sendTransport.id,
                dtlsParameters,
              })
              .then(callback)
              .catch(errback);
          },
        );

        this._sendTransport.on(
          'produce',
          async ({ kind, rtpParameters, appData }, callback, errback) => {
            try {
              const { id } = await this._protoo.request('produce', {
                transportId: this._sendTransport.id,
                kind,
                rtpParameters,
                appData,
              });

              // this.changeOnlyConsumer(false);
              callback({ id });
              // Резолвим промис в этом месте, т.е. пока до сюда не дойдёт,
              // промис будет pending
            } catch (error) {
              errback(error);
            }
          },
        );

        store.dispatch(this.setAction().setProduce(true));

        const payload = {
          canSendMic: this._mediasoupDevice.canProduce('audio'),
          canSendWebcam: this._mediasoupDevice.canProduce('video'),
        };

        store.dispatch(this.setAction().setMediaCapabilities(payload));
      })
      .catch((err) => {
        logger.error(err.stack);
      });
  }

  async _joinRoom(teamId, autoOnMicAndCam) {
    function handleError(error) {
      store.dispatch(
        addNotification({
          message: messages.cantJoinRoom,
          type: 'error',
        }),
      );
      logger.error(`_joinRoom: ${error.stack || error.message || error}`);
      this.close();
    }

    try {
      this._mediasoupDevice = new mediasoupClient.Device();

      const routerRtpCapabilities = await this._protoo.request(
        'getRouterRtpCapabilities',
      );

      await this._mediasoupDevice.load({ routerRtpCapabilities });
    } catch (error) {
      handleError(error);
      return;
    }

    // NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
    //
    // Just get access to the mic and DO NOT close the mic track for a while.
    // Super hack!
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const audioTrack = stream.getAudioTracks()[0];

      audioTrack.enabled = false;

      // this._hackPlayback = setTimeout(() => audioTrack.stop(), 120000);
    } catch (e) {}

    try {
      const { produce } = store.getState().videoChat.me;

      // Create mediasoup Transport for sending (unless we don't want to produce).
      if (produce) {
        const transportInfo = await this._protoo.request(
          'createWebRtcTransport',
          {
            forceTcp: this._forceTcp,
            producing: true,
            consuming: false,
          },
        );

        const {
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        } = transportInfo;

        this._sendTransport = this._mediasoupDevice.createSendTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        });

        this._sendTransport.on(
          'connect',
          ({ dtlsParameters }, callback, errback) => {
            this._protoo
              .request('connectWebRtcTransport', {
                transportId: this._sendTransport.id,
                dtlsParameters,
              })
              .then(callback)
              .catch(errback);
          },
        );

        this._sendTransport.on(
          'produce',
          async ({ kind, rtpParameters, appData }, callback, errback) => {
            try {
              const { id } = await this._protoo.request('produce', {
                transportId: this._sendTransport.id,
                kind,
                rtpParameters,
                appData,
              });

              callback({ id });
            } catch (error) {
              errback(error);
            }
          },
        );
      }

      // Create mediasoup Transport for sending (unless we don't want to consume).
      if (this._consume) {
        const transportInfo = await this._protoo.request(
          'createWebRtcTransport',
          {
            forceTcp: this._forceTcp,
            producing: false,
            consuming: true,
          },
        );

        const {
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        } = transportInfo;

        this._recvTransport = this._mediasoupDevice.createRecvTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
        });

        this._recvTransport.on(
          'connect',
          ({ dtlsParameters }, callback, errback) => {
            this._protoo
              .request('connectWebRtcTransport', {
                transportId: this._recvTransport.id,
                dtlsParameters,
              })
              .then(callback)
              .catch(errback);
          },
        );
      }

      // Join now into the room.
      // NOTE: Don't send our RTP capabilities if we don't want to consume.

      const { avatar, color } = store.getState().user;
      const { peers } = await this._protoo.request('join', {
        displayName: this._displayName,
        settings: {
          avatar,
          color,
          micPermission: true,
          camPermission: true,
          canSendMic: true,
          canSendWebcam: true,
        },
        device: this._device,
        rtpCapabilities: this._consume
          ? this._mediasoupDevice.rtpCapabilities
          : undefined,
        groupId: teamId,
      });

      store.dispatch(this.setAction().setRoomState('connected'));

      for (const peer of peers) {
        const payload = { ...peer, consumers: [] };
        this.addPeer(payload);
      }

      // Enable mic/webcam.
      if (produce) {
        const payload = {
          canSendMic: this._mediasoupDevice.canProduce('audio'),
          canSendWebcam: this._mediasoupDevice.canProduce('video'),
        };
        // Set our media capabilities.
        store.dispatch(this.setAction().setMediaCapabilities(payload));

        this.enableMic().then(() => {
          // Вот такая ситуация часто бывает, поэтому нам нужно как-то паузить
          // mute
          //
          // +------------+          +-------------+     +---------------+
          // |  user 1    |          |   user 2    |     |   user 3      |
          // |            |          |             |     |               |
          // +------------+          +------+------+     +---------------+
          //                                |
          //                                v
          // +-------------+         +------+------+     +---------------+
          // |  Приходит   |   +-----+ Включает    |     | Приходит      |
          // |  пауза      +<----+   | микрофон    +---->+ консумер      |
          // +-------------+   | |   +------+------+     +---------------+
          //                   | |          |
          //                   | |          v
          //  +------------+   | |  +-------+------+     +---------------+
          //  | Приходит   |   | |  | Ставит       |     |  Приходит     |
          //  | консумер   +<--+ +--+ на паузу     +---->+  пауза        |
          //  +------------+        +--------------+     +---------------+
          if (Platform.OS === 'ios') {
            BackgroundTimer.start();
          }
          BackgroundTimer.setTimeout(() => {
            if (autoOnMicAndCam) {
              this.unmuteMic();
            } else {
              this.muteMic();
            }
          }, 100);
          if (Platform.OS === 'ios') {
            BackgroundTimer.stop();
          }
        });
        // this.enableWebcam().then(() => this.disableWebcam());

        // Проверим подключена ли камера и есть ли доступ. Эта инфа будет
        // отправлена в объект settings в пир
        this.checkWebCam();
      }

      if (autoOnMicAndCam) {
        this.enableWebcam();
      }
    } catch (error) {
      handleError(error);
    }
  }

  async _updateWebcams() {
    // Reset the list.
    this._webcams = new Map();

    const devices = await navigator.mediaDevices.enumerateDevices();
    for (const device of devices) {
      if (device.kind !== 'videoinput') {
        continue;
      }
      this._webcams.set(device.deviceId, device);
    }

    const array = Array.from(this._webcams.values());
    const len = array.length;
    const currentWebcamId = this._webcam.device
      ? this._webcam.device.deviceId
      : undefined;

    if (len === 0) {
      this._webcam.device = null;
    } else if (!this._webcams.has(currentWebcamId)) {
      this._webcam.device = array[1];
    }

    store.dispatch(this.setAction().setCanChangeWebcam(this._webcams.size > 1));
  }

  _getWebcamType(device) {
    if (/(back|rear)/i.test(device.label.toLowerCase())) {
      return 'back';
    } else {
      return 'front';
    }
  }

  _checkIsDeviceFront(device) {
    return device ? device.label.toLowerCase().indexOf('front') !== -1 : false;
  }

  async resumeConsumerById(consumerId) {
    const consumer = this._consumers.get(consumerId);

    if (!consumer) {
      return;
    }

    const { videoChat } = store.getState();
    const consumerData = videoChat.consumers[consumerId];

    // локально продьюсер уже не на паузе
    if (!consumerData.locallyPaused) {
      return;
    }

    try {
      await this._protoo.request('resumeConsumer', {
        consumerId: consumer.id,
      });
      consumer.resume();
      store.dispatch(this.setAction().setConsumerResumed(consumer.id, 'local'));
    } catch (error) {
      logger.warn(
        `resumeConsumerById: ${error.stack || error.message || error}`,
      );
    }
  }

  async pauseConsumerById(consumerId) {
    const consumer = this._consumers.get(consumerId);

    if (!consumer) {
      return;
    }

    const { videoChat } = store.getState();
    const consumerData = videoChat.consumers[consumerId];

    // Если локально продьюсер уже на паузе, ничего не делаем
    if (consumerData.locallyPaused) {
      return;
    }

    await this._pauseConsumer(consumer);
  }

  async _pauseConsumer(consumer) {
    if (consumer.paused) return;

    try {
      await this._protoo.request('pauseConsumer', { consumerId: consumer.id });

      consumer.pause();

      store.dispatch(this.setAction().setConsumerPaused(consumer.id, 'local'));
    } catch (error) {
      logger.error(`_pauseConsumer: ${error.stack || error.message || error}`);
    }
  }

  changeSettings(settings = {}) {
    if (!this._protoo._connected) {
      return Promise.reject('changeSettings: not yet connected');
    }

    return this._protoo
      .request('changeSettings', { settings })
      .then(() => {
        store.dispatch(this.setAction().changeMeSettings(settings));
      })
      .catch((err) => {
        logger.error(err.stack);
      });
  }

  setAction = () => actions;

  addPeer(peer) {
    const { pinned, speaker } = store.getState().session?.session;

    // Нужно понять в какой объект будем добавлять пира:
    // спикер/прикреплённые/все остальные
    if (speaker && peer.id === speaker.id) {
      store.dispatch(actions.addSpeakerPeer(peer));
    } else if (pinned.some((user) => user.id === peer.id)) {
      store.dispatch(actions.addPinnedPeer(peer));
    } else {
      store.dispatch(actions.addPeer(peer));
    }
  }
}
