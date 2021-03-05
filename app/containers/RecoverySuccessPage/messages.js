import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  passwordRecovery: {
    id: `${account}.passwordRecovery`,
    defaultMessage: 'Восстановление пароля',
  },
  successRecoveryMessage: {
    id: `${account}.successRecoveryMessage`,
    defaultMessage:
      'Инструкции по восстановлению пароля были отправлены на указанный эл. адрес. Если вы не видите письмо, проверьте папку спам или обратитесь в техподдержку.',
  },
  continue: {
    id: `${account}.continue`,
    defaultMessage: 'Продолжить',
  },
  thankYou: {
    id: `${account}.thankYou`,
    defaultMessage: 'Спасибо!',
  },
});
