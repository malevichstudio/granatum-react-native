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
  notHaveAccountYet: {
    id: `${account}.notHaveAccountYet`,
    defaultMessage: 'Нет аккаунта?',
  },
  signInAs: {
    id: `${account}.signInAs`,
    defaultMessage: 'Или войти с помощью эл. почты',
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
});
