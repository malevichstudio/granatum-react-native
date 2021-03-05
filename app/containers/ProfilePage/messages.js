import { defineMessages } from 'react-intl';

const account = 'account';

export default defineMessages({
  uploadAvatar: {
    id: `${account}.uploadAvatar`,
    defaultMessage: 'Выбрать файл',
  },
  account: {
    id: `${account}.account`,
    defaultMessage: ' ',
  },
  changeAvatar: {
    id: `${account}.changeAvatar`,
    defaultMessage: 'Изменить фото',
  },
  deleteAvatar: {
    id: `${account}.deleteAvatar`,
    defaultMessage: 'Удалить',
  },
  name: {
    id: `${account}.name`,
    defaultMessage: 'Имя',
  },
  gender: {
    id: `${account}.gender`,
    defaultMessage: 'Пол',
  },
  male: {
    id: `${account}.male`,
    defaultMessage: 'Мужской',
  },
  female: {
    id: `${account}.female`,
    defaultMessage: 'Женский',
  },
  other: {
    id: `${account}.other`,
    defaultMessage: 'Другой',
  },
  dataBirthday: {
    id: `${account}.birthday`,
    defaultMessage: 'Дата рождения',
  },
  country: {
    id: `${account}.country`,
    defaultMessage: 'Страна',
  },
  locality: {
    id: `${account}.locality`,
    defaultMessage: 'Населённый пункт',
  },
  email: {
    id: `${account}.email`,
    defaultMessage: 'Эл.почта',
  },
  newPassword: {
    id: `${account}.newPassword`,
    defaultMessage: 'Новый пароль',
  },
  repeatPassword: {
    id: `${account}.passwordConfirm`,
    defaultMessage: 'Подтвердите пароль',
  },
  passwordCreate: {
    id: `${account}.passwordCreate`,
    defaultMessage: 'Придумайте пароль',
  },
  updateAccountInfoSuccess: {
    id: `${account}.updateAccountInfoSuccess`,
    defaultMessage: 'Личная информация успешно изменена',
  },
  updatePasswordSuccess: {
    id: `${account}.updatePasswordSuccess`,
    defaultMessage: 'Пароль успешно изменён',
  },
  oldPassword: {
    id: `${account}.oldPassword`,
    defaultMessage: 'Текущий пароль',
  },
  connectedSocials: {
    id: `${account}.connectedSocials`,
    defaultMessage: 'Связанные соцсети',
  },
  connectSocial: {
    id: `${account}.connectSocial`,
    defaultMessage: 'Привязать соцсеть',
  },
  confirmDeleteSocial: {
    id: `${account}.confirmDeleteSocial`,
    defaultMessage: 'Вы уверены, что хотите удалить связь с аккаунтом в ',
  },
  cancel: {
    id: 'controls.cancel',
    defaultMessage: 'Отмена',
  },
  takePhoto: {
    id: 'controls.takePhoto',
    defaultMessage: 'Выбрать фото...',
  },
  chooseFromLibrary: {
    id: 'controls.chooseFromLibrary',
    defaultMessage: 'Выбрать из файлов...',
  },
  remove: {
    id: 'controls.remove',
    defaultMessage: 'Удалить',
  },
  noOptionsAutocomplete: {
    id: `${account}.noOptionsAutocomplete`,
    defaultMessage: 'Нет результатов',
  },
  generalInfo: {
    id: `${account}.generalInfo`,
    defaultMessage: 'Основная информация',
  },
  changePassword: {
    id: `${account}.changePassword`,
    defaultMessage: 'Изменить пароль',
  },
  setPassword: {
    id: `${account}.setPassword`,
    defaultMessage: 'Установить пароль',
  },
  linkedAccounts: {
    id: `${account}.linkedAccounts`,
    defaultMessage: 'Связанные соцсети',
  },
  personalData: {
    id: `${account}.personalData`,
    defaultMessage: 'Личные данные',
  },
  profilePicture: {
    id: `${account}.profilePicture`,
    defaultMessage: 'Изображение профиля',
  },
  linkFacebookAccount: {
    id: `${account}.linkFacebookAccount`,
    defaultMessage: 'Привязать Facebook ',
  },
  linkGoogleAccount: {
    id: `${account}.linkGoogleAccount`,
    defaultMessage: 'Привязать Google ',
  },
  linkVkAccount: {
    id: `${account}.linkVkAccount`,
    defaultMessage: 'Привязать Vk ',
  },
  linkedAs: {
    id: `${account}.linkedAs`,
    defaultMessage: 'Связан как ',
  },
  profileCompleteTip: {
    id: `${account}.profileCompleteTip`,
    defaultMessage:
      'Заполненный на 100% профиль поможет ведущим взаимодействовать с вами более эффективно!',
  },
  profileCompleted: {
    id: `${account}.profileComplete`,
    defaultMessage: 'Профиль заполнен на ',
  },
  complete: {
    id: `${account}.complete`,
    defaultMessage: '.',
  },
  save: {
    id: 'controls.save',
    defaultMessage: 'Сохранить',
  },
  avatarUploadSuccess: {
    id: `${account}.avatarUploadSuccess`,
    defaultMessage: 'Фото профиля успешно обновлено',
  },
  fileFormats: {
    id: `${account}.fileFormats`,
    defaultMessage: 'Формат - JPEG, JPG, PNG, GIF, BMP, не более 50Мб',
  },
  logout: {
    id: `${account}.logout`,
    defaultMessage: 'Выйти',
  },
  profile: {
    id: `${account}.profile`,
    defaultMessage: 'Профиль',
  },
  emailConfirmed: {
    id: `${account}.emailConfirmed`,
    defaultMessage: 'Электронная почта подтверждена',
  },
  youHaveNotSetPassword: {
    id: `${account}.youHaveNotSetPassword`,
    defaultMessage:
      'Вы ещё не устанавливали пароль. Задайте пароль для возможности входа с эл. адресом.',
  },
  weHaveSentAnEmail: {
    id: `${account}.weHaveSentAnEmail`,
    defaultMessage:
      'Вам на почту было отправлено письмо. Чтобы подтвердить эл. почту, пройдите по ссылке из этого письма. Если вы не видите письмо, проверьте папку “Спам” или обратитесь в техподдержку.',
  },
});
