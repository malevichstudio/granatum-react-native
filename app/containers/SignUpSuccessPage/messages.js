import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  registration: {
    id: `${account}.registration`,
    defaultMessage: 'Регистрация',
  },
  successRegistrationMessage: {
    id: `${account}.successRegistrationMessage`,
    defaultMessage:
      'На Вашу почту было отправлено письмо. Чтобы завершить регистрацию, пройдите по ссылке из этого письма.',
  },
  thankYou: {
    id: `${account}.thankYou`,
    defaultMessage: 'Спасибо!',
  },
  continue: {
    id: `signIn.continue`,
    defaultMessage: 'Продолжить',
  },
});
