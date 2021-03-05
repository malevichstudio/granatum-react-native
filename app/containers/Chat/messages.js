import { defineMessages } from 'react-intl';

const chat = 'chat';

export default defineMessages({
  findUser: {
    id: `${chat}.findUser`,
    defaultMessage: 'Найти пользователя',
  },
  typeMessage: {
    id: `${chat}.typeMessage`,
    defaultMessage: 'Напишите сообщение',
  },
  today: {
    id: `${chat}.today`,
    defaultMessage: 'Сегодня',
  },
  newMessages: {
    id: `${chat}.newMessages`,
    defaultMessage: 'Новые сообщения',
  },
  send: {
    id: `controls.send`,
    defaultMessage: 'Отправить',
  },
});
