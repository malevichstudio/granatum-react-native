import * as yup from 'yup';

const name = yup
  .string()
  .required('errors.validation.fieldIsRequired')
  .test('validateName', 'errors.validation.invalidCharacters', (name) =>
    validateName(name),
  );
const email = yup
  .string()
  .email('errors.validation.incorrectEmailAddress')
  .required('errors.validation.fieldIsRequired');
const password = yup
  .string()
  .required('errors.validation.fieldIsRequired')
  .test(
    'checkLatinLetters',
    'errors.validation.passwordMustHaveLatinLetters',
    (password) => checkLatinLetters(password),
  )
  .test(
    'checkOneNumber',
    'errors.validation.passwordMustBeAtLeast1Number',
    (password) => checkOneNumber(password),
  )
  .test(
    'checkSpecialSymbol',
    'errors.validation.passwordMustHaveSpecialSymbol',
    (password) => checkSpecialSymbol(password),
  )
  .test(
    'checkPasswordLength',
    'errors.validation.passwordMustBeAtLeast8CharactersLong',
    (password) => checkPasswordLength(password),
  );

export const getValidationSchemaLogin = () => {
  return yup.object().shape({
    email,
  });
};

export const getValidationSchemaRestorePassword = () => {
  return yup.object().shape({
    password,
  });
};

export const getValidationSchemaQuest = () => {
  return yup.object().shape({
    name,
  });
};

export const getValidationSchemaRecovery = () => {
  return yup.object().shape({
    email,
  });
};

export const getValidationSchemaSignUp = () => {
  return yup.object().shape({
    name,
    email,
    password,
  });
};

export const getValidationSchemaProfileInfo = () => {
  return yup.object().shape({
    name,
  });
};

export const getValidationSchemaSignUpWithOnlyEmail = () => {
  return yup.object().shape({
    email,
  });
};

export const getValidationSchemaProfilePassword = (noPassword) => {
  if (!noPassword) {
    return yup.object().shape({
      oldPassword: yup.string().required('errors.validation.fieldIsRequired'),
      password,
    });
  }
  return yup.object().shape({
    password,
  });
};

export const getValidationSchemaSignUpFinishing = () => {
  return yup.object().shape({
    password,
  });
};

export const checkLatinLetters = (password) => {
  // убираем все спецсимволы и цифры
  const passwordWithoutSymbols = password?.replace(
    /[!#$%&‘*+-/=?^`_{}|~(),.:;<>@[\\\]'0-9]/g,
    '',
  );
  return typeof passwordWithoutSymbols === 'string' &&
    !/^[a-zA-Z]+$/.test(passwordWithoutSymbols)
    ? false
    : true;
};

export const checkOneNumber = (password) =>
  typeof password === 'string' && !/\d+/.test(password) ? false : true;

export const checkSpecialSymbol = (password) =>
  typeof password === 'string' &&
  !/[!#$%&‘*+-/=?^`_{}|~(),.:;<>@[\\\]']/.test(password)
    ? false
    : true;

export const checkPasswordLength = (password) =>
  typeof password === 'string' && password.length < 8 ? false : true;

export const validateName = (name) =>
  typeof name === 'string' &&
  // @see https://stackoverflow.com/questions/2041859/javascript-how-to-find-hebrew
  !/^[A-Za-zА-Яа-я0-9-\u0590-\u05FF ё\s-.']+$/.test(name.trim())
    ? false
    : true;
