import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  registrationConfirmed: {
    id: `${account}.registrationConfirmed`,
    defaultMessage: 'Регистрация подтверждена!',
  },
  youWillBeRedirected: {
    id: `${account}.youWillBeRedirected`,
    defaultMessage:
      'Пожалуйста, подождите. Сейчас вы будете перенаправлены на портал. Или нажмите кнопку ниже, если ничего не произошло. ',
  },
  goToPortal: {
    id: `${account}.goToPortal`,
    defaultMessage: 'Перейти на портал',
  },
});
