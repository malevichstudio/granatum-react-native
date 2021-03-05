import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  email: {
    id: `${account}.email`,
    defaultMessage: 'Эл. адрес',
  },
  password: {
    id: `${account}.password`,
    defaultMessage: 'Придумайте пароль',
  },
  name: {
    id: `${account}.name`,
    defaultMessage: 'Ваше имя',
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
