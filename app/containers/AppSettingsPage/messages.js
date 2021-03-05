import { defineMessages } from 'react-intl';

const appSettings = 'appSettings';

export default defineMessages({
  settings: {
    id: `${appSettings}.settings`,
    defaultMessage: 'Настройки',
  },
  language: {
    id: `${appSettings}.language`,
    defaultMessage: 'Язык',
  },
  notification: {
    id: `${appSettings}.notification`,
    defaultMessage: 'Уведомлять о сессиях',
  },
  auto: {
    id: `${appSettings}.auto`,
    defaultMessage: 'Автоматически',
  },
});
