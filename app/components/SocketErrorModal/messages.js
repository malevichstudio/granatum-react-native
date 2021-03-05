import { defineMessages } from 'react-intl';

export default defineMessages({
  connectionInterrupted: {
    id: 'errorModal.connectionInterrupted',
    defaultMessage: 'Соединение прервано',
  },
  hasError: {
    id: 'errorModal.hasError',
    defaultMessage: 'Произошла ошибка',
  },
  socketInfo: {
    id: 'errorModal.socketInfo',
    defaultMessage:
      'Пытаемся восстановить подключение. Как только соединение будет восстановлено, вы сможете продолжить работу.',
  },
  socketFailed: {
    id: 'errorModal.socketFailed',
    defaultMessage: 'Не удалось установить соединение',
  },
  reloadApp: {
    id: 'errorModal.reloadApp',
    defaultMessage: 'Перезагрузить приложение',
  },
});
