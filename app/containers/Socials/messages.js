import { defineMessages } from 'react-intl';

const prefix = 'socials';

export default defineMessages({
  email: {
    id: 'course.email',
    defaultMessage: 'Эл. адрес',
  },
  yourEmail: {
    id: `${prefix}.yourEmail`,
    defaultMessage: 'Ваш эл. адрес',
  },
  signUp: {
    id: `account.signUp`,
    defaultMessage: 'Зарегистрироваться',
  },
  almostReady: {
    id: `${prefix}.almostReady`,
    defaultMessage: 'Почти готово',
  },
  forCompleteRegistration: {
    id: `${prefix}.forCompleteRegistration`,
    defaultMessage: 'Для завершения регистрации укажите свой электорнный адрес',
  },
});
