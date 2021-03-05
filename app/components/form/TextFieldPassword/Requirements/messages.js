import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  passwordRequirement: {
    id: `${account}.passwordRequirement`,
    defaultMessage: 'Требование к паролю:',
  },
  latinLetters: {
    id: `${account}.latinLetters`,
    defaultMessage: 'Буквы латинского алфавита',
  },
  oneNumber: {
    id: `${account}.oneNumber`,
    defaultMessage: 'Как минимум одна цифра',
  },
  specialSymbol: {
    id: `${account}.specialSymbol`,
    defaultMessage: `Спецсимволы:`,
  },
  passwordLength: {
    id: `${account}.passwordLength`,
    defaultMessage: 'Длина от 8 до 50 символов',
  },
});
