import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  email: {
    id: `${account}.email`,
    defaultMessage: 'Эл. почта',
  },
  passwordRecovery: {
    id: `${account}.passwordRecovery`,
    defaultMessage: 'Восстановление пароля',
  },
  emailRecovery: {
    id: `${account}.emailRecovery`,
    defaultMessage:
      'Для восстановления пароля введите электронный адрес, указанный при регистрации',
  },
  send: {
    id: 'controls.send',
    defaultMessage: 'Отправить',
  },
  back: {
    id: 'controls.back',
    defaultMessage: 'Назад',
  },
});
