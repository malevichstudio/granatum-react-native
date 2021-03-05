import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  passwordRecovery: {
    id: `${account}.passwordRecovery`,
    defaultMessage: 'Восстановление пароля',
  },
  newPassword: {
    id: `${account}.newPassword`,
    defaultMessage: 'Новый пароль',
  },
  restorePasswordConfirm: {
    id: `${account}.restorePasswordConfirm`,
    defaultMessage: 'Подтвердите пароль',
  },
  restorePasswordSend: {
    id: `${account}.restorePasswordSend`,
    defaultMessage: 'Изменить пароль',
  },
  restorePasswordSuccess: {
    id: `${account}.restorePasswordSuccess`,
    defaultMessage: 'Пароль успешно изменен',
  },
  invalidVerifyToken: {
    id: 'errors.backend.account.invalidVerifyToken',
    defaultMessage:
      'Ссылка уже недействительна. Пожалуйста, обратитесь в техподдержку для получения новой ссылки.',
  },
});
