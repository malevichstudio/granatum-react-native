import { defineMessages } from 'react-intl';

export default defineMessages({
  exitSession: {
    id: 'session.exitSession',
    defaultMessage: 'Выход из сессии',
  },
  doYouWantToExitSession: {
    id: 'session.doYouWantToExitSession',
    defaultMessage: 'Вы действительно хотите покинуть сессию?',
  },
  exit: {
    id: 'ui.exit',
    defaultMessage: 'Выйти',
  },
  cancel: {
    id: 'controls.cancel',
    defaultMessage: 'Отмена',
  },
  collapse: {
    id: 'controls.collapse',
    defaultMessage: 'Свернуть',
  },
  expand: {
    id: 'controls.expand',
    defaultMessage: 'Развернуть',
  },
  thisIsYou: {
    id: 'ui.thisIsYou',
    defaultMessage: 'Это вы',
  },
  cantJoinRoom: {
    id: 'videoChat.cantJoinRoom',
    defaultMessage: 'Ошибка подключения к видеочату',
  },
  cantJoinRoomPermission: {
    id: 'videoChat.cantJoinRoomPermission',
    defaultMessage:
      'Ошибка подключения к видеочату. Возможно, вы не дали разрешение на использование микрофона',
  },
  webSocketFail: {
    id: 'videoChat.webSocketFail',
    defaultMessage: 'Ошибка соединения с видео-сервером',
  },
  webSocketDisconnect: {
    id: 'videoChat.webSocketDisconnect',
    defaultMessage: 'Проблемы с вашим интернетом. Перезагрузите страницу',
  },
  micDisconnect: {
    id: 'videoChat.micDisconnect',
    defaultMessage: 'Микрофон отключен',
  },
  micEnableError: {
    id: 'videoChat.micEnableError',
    defaultMessage:
      'Ошибка подключения микрофона. Возможно, вы не дали разрешение на использование микрофона',
  },
  micDisableError: {
    id: 'videoChat.micDisableError',
    defaultMessage: 'Ошибка отключения микрофона',
  },
  shareDisableError: {
    id: 'videoChat.shareDisableError',
    defaultMessage: 'Ошибка отключения демонстрации экрана',
  },
  camDisconnect: {
    id: 'videoChat.camDisconnect',
    defaultMessage: 'Камера отключена',
  },
  camEnableError: {
    id: 'videoChat.camEnableError',
    defaultMessage:
      'Ошибка подключения камеры. Возможно, вы не дали разрешение на использование камеры',
  },
  camDisableError: {
    id: 'videoChat.camDisableError',
    defaultMessage: 'Ошибка отключения камеры',
  },
  micPermissionErrorText: {
    id: 'videoChat.micPermissionErrorText',
    defaultMessage:
      'Разрешите использование микрофона в настройках вашего браузера и перезагрузите страницу',
  },
  inOrderToKeepPerf: {
    id: 'videoChat.inOrderToKeepPerf',
    defaultMessage:
      'В целях сохранения производительности вашего устройства вы не сможете видеть участников сессии, однако вы сможете их слышать, а также видеть спикеров.',
  },
  iSee: {
    id: 'controls.iSee',
    defaultMessage: 'Понятно',
  },
  host: {
    id: 'videoChat.host',
    defaultMessage: 'Ведущий',
  },
  speaker: {
    id: 'videoChat.speaker',
    defaultMessage: 'Спикер',
  },
  adminDisabledYourMic: {
    id: 'videoChat.adminDisabledYourMic',
    defaultMessage: 'Администратор отключил ваш микрофон',
  },
  adminDisabledYourCam: {
    id: 'videoChat.adminDisabledYourCam',
    defaultMessage: 'Администратор отключил вашу камеру',
  },
  adminEnabledYourMicAndCam: {
    id: 'videoChat.adminEnabledYourMicAndCam',
    defaultMessage: 'Администратор разрешил выходить в вещание',
  },
  adminDisabled: {
    id: 'videoChat.adminDisabled',
    defaultMessage: 'Администратор запретил выход в вещание',
  },
  moreThenTenStreams: {
    id: 'videoChat.moreThenTenStreams',
    defaultMessage:
      '10 и более видеопотоков одновременно может давать значительную нагрузку на ваше устройство. Отключение камеры поможет снизить нагрузку.',
  },
  broadcastBlock: {
    id: 'videoChat.BroadcastBlock',
    defaultMessage: 'Запрет вещания',
  },
  usersBroadcastSettings: {
    id: 'videoChat.usersBroadcastSettings',
    defaultMessage: 'Вещание пользователей',
  },
  MyBroadcast: {
    id: 'videoChat.MyBroadcast',
    defaultMessage: 'Мое вещание',
  },
  camOk: {
    id: 'videoChat.camOk',
    defaultMessage: 'Камера работает',
  },
  camNotOk: {
    id: 'videoChat.camNotOk',
    defaultMessage: 'Камера не работает',
  },
  camPermission: {
    id: 'videoChat.camPermission',
    defaultMessage: 'Камера нет разрешения',
  },
  micOk: {
    id: 'videoChat.micOk',
    defaultMessage: 'Микрофон работает',
  },
  micNotOk: {
    id: 'videoChat.micNotOk',
    defaultMessage: 'Микрофон не работает',
  },
  micPermission: {
    id: 'videoChat.micPermission',
    defaultMessage: 'Микрофон нет разрешения',
  },
  desktop: {
    id: 'videoChat.desktop',
    defaultMessage: 'Компьютер',
  },
  mobile: {
    id: 'videoChat.mobile',
    defaultMessage: 'Телефон',
  },
  tablet: {
    id: 'videoChat.tablet',
    defaultMessage: 'Планшет',
  },
  touch: {
    id: 'videoChat.touch',
    defaultMessage: 'Тач',
  },
  mouse: {
    id: 'videoChat.mouse',
    defaultMessage: 'Мышь или тачпад',
  },
  noTeamsOnThePage: {
    id: 'videoChat.noTeamsOnThePage',
    defaultMessage:
      'Пока на листе нет команд, доступно вещание только на все листы (иконка рупора)',
  },
  noUsersOnThePage: {
    id: 'videoChat.noUsersOnThePage',
    defaultMessage:
      'Пока на листе нет пользователей, доступно вещание только на все листы (иконка рупора)',
  },
  hostNotHear: {
    id: 'videoChat.hostNotHear',
    defaultMessage: 'Ведущий делает общее объявление. Он вас не слышит',
  },
  videoChatConnectFail: {
    id: 'videoChat.videoChatConnectFail',
    defaultMessage: 'Потеря подключения к видеосерверу',
  },
  restoringConnection: {
    id: 'videoChat.restoringConnection',
    defaultMessage: 'Соединение c видеосервером восстанавливается',
  },
  connectFail: {
    id: 'videoChat.connectFail',
    defaultMessage: 'Потеря подключения',
  },
  restoringNetwork: {
    id: 'videoChat.restoringNetwork',
    defaultMessage: 'Соединение восстанавливается',
  },
  blockCameraOn: {
    id: 'videoChat.blockCameraOn',
    defaultMessage: 'Запретить включать камеру',
  },
  blockMicOn: {
    id: 'videoChat.blockMicOn',
    defaultMessage: 'Запретить включать микрофон',
  },
  allowCameraOn: {
    id: 'videoChat.allowCameraOn',
    defaultMessage: 'Разрешить включать камеру',
  },
  allowMicOn: {
    id: 'videoChat.allowMicOn',
    defaultMessage: 'Разрешить включать микрофон',
  },
  findUser: {
    id: 'chat.findUser',
    defaultMessage: 'Найти пользователя',
  },
  speakersAndPinned: {
    id: 'videoChat.speakersAndPinned',
    defaultMessage: 'Спикеры и закреплённые',
  },
  pinUser: {
    id: 'videoChat.pinUser',
    defaultMessage: 'Закрепить пользователя',
  },
  unpinUser: {
    id: 'videoChat.unpinUser',
    defaultMessage: 'Открепить пользователя',
  },
  assignSpeaker: {
    id: 'videoChat.assignSpeaker',
    defaultMessage: 'Сделать спикером',
  },
  removeFromSpeakers: {
    id: 'videoChat.removeFromSpeakers',
    defaultMessage: 'Удалить из спикеров',
  },
  stopBeingSpeaker: {
    id: 'videoChat.stopBeingSpeaker',
    defaultMessage: 'Перестать быть спикером',
  },
  youAreSpeaker: {
    id: 'videoChat.youAreSpeaker',
    defaultMessage: 'Вы спикер',
  },
  youCantStartSharing: {
    id: 'videoChat.youCantStartSharing',
    defaultMessage:
      'Нельзя начать демонстрацию экрана, пока другой её не завершит',
  },
  startScreenSharing: {
    id: 'videoChat.startScreenSharing',
    defaultMessage: 'Демонстрация экрана',
  },
  stopScreenSharing: {
    id: 'videoChat.stopScreenSharing',
    defaultMessage: 'Завершить демонстрацию экрана',
  },
  screenSharingNotAvailableForTeams: {
    id: 'videoChat.screenSharingNotAvailableForTeams',
    defaultMessage:
      'Если включить демонстрацию, то ваш экран увидят только те, кого вы видите в панели. Демонстрация экрана на все команды временно недоступна.',
  },
  turnUpTheVolume: {
    id: 'videoChat.turnUpTheVolume',
    defaultMessage: 'Включить звук',
  },
  refreshUser: {
    id: 'videoChat.refreshUser',
    defaultMessage: 'Обновить',
  },
  // micOn: {
  //   id: 'videoChat.micOn',
  //   defaultMessage: 'Включить микрофон',
  // },
  micOff: {
    id: 'videoChat.micOff',
    defaultMessage: 'Выключить микрофон',
  },
  cameraOn: {
    id: 'videoChat.cameraOn',
    defaultMessage: 'Включить камеру',
  },
  cameraOff: {
    id: 'videoChat.cameraOff',
    defaultMessage: 'Выключить камеру',
  },
  broadcastingToAllOn: {
    id: 'videoChat.broadcastingToAllOn',
    defaultMessage: 'Включить вещание на все листы',
  },
  broadcastingToAllOff: {
    id: 'videoChat.broadcastingToAllOff',
    defaultMessage: 'Выключить вещание на все листы',
  },
  turnCamera: {
    id: 'videoChat.turnCamera',
    defaultMessage: 'Переключить камеру',
  },
  noSpeakers: {
    id: 'videoChat.noSpeakers',
    defaultMessage: 'Спикеров пока нет',
  },
  knowledgeBase: {
    id: 'ui.knowledgeBase',
    defaultMessage: 'База знаний',
  },
  help: {
    id: 'help.help',
    defaultMessage: 'Помощь',
  },
  turnCameraFirst: {
    id: 'videoChat.turnCameraFirst',
    defaultMessage: 'Сначала надо включить камеру в видеопанели',
  },
});
