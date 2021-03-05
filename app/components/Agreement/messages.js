import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  iAgree: {
    id: `${account}.iAgree`,
    defaultMessage: 'Я прочёл и принимаю условия {policy}.',
  },
  iAgreeEnter: {
    id: `${account}.iAgreeEnter`,
    defaultMessage: 'Нажимая "Войти", вы соглашаетесь с текстом {policy}.',
  },
  isResident: {
    id: `${account}.isResident`,
    defaultMessage: 'Вы резидент РФ?',
  },
  policy: {
    id: `${account}.policy`,
    defaultMessage: 'Политики конфиденциальности',
  },
  yes: {
    id: 'controls.yes',
    defaultMessage: 'Да',
  },
  no: {
    id: 'controls.no',
    defaultMessage: 'Нет',
  },
});
