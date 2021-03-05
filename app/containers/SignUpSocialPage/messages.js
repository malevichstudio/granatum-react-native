import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  email: {
    id: `${account}.email`,
    defaultMessage: 'Эл. почта',
  },
  password: {
    id: `${account}.password`,
    defaultMessage: 'Пароль',
  },
  yourEmail: {
    id: `socials.yourEmail`,
    defaultMessage: 'Ваш эл. адрес',
  },
  signIn: {
    id: `${account}.signIn`,
    defaultMessage: 'Войти',
  },
  logInToTheApp: {
    id: `${account}.logInToTheApp`,
    defaultMessage: 'Вход в приложение',
  },
  forgotPassword: {
    id: `${account}.forgotPassword`,
    defaultMessage: 'Забыли пароль?',
  },
  registration: {
    id: `${account}.registration`,
    defaultMessage: 'Регистрация',
  },
  registerViaEmail: {
    id: `${account}.registerViaEmail`,
    defaultMessage: 'Регистрация с эл. адресом ',
  },
  notRegisteredYet: {
    id: `${account}.notRegisteredYet`,
    defaultMessage: 'У вас еще нет аккаунта? ',
  },
  signInAs: {
    id: `${account}.signInAs`,
    defaultMessage: 'Войти с помощью',
  },
  signInOr: {
    id: `${account}.signInOr`,
    defaultMessage: 'Или',
  },
  signUp: {
    id: `${account}.signUp`,
    defaultMessage: 'Зарегистрироваться',
  },
  unauthorized: {
    id: 'errors.backend.account.unauthorized',
    defaultMessage: 'Неверный логин или пароль',
  },
  almostReady: {
    id: `socials.almostReady`,
    defaultMessage: 'Почти готово',
  },
  forCompleteRegistration: {
    id: `socials.forCompleteRegistration`,
    defaultMessage: 'Для завершения регистрации укажите свой электорнный адрес',
  },
  accountNotVerified: {
    id: 'errors.backend.account.accountNotVerified',
    defaultMessage: 'Аккаунт не подтвержден',
  },
  invalidVerifyToken: {
    id: 'errors.backend.account.invalidVerifyToken',
    defaultMessage:
      'Ваш аккаунт уже подтвержден. Сейчас вы будете перенаправлены на портал',
  },
  alreadyHaveAnAccount: {
    id: `${account}.alreadyHaveAnAccount`,
    defaultMessage: 'Уже есть аккаунт?',
  },
});
