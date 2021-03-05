import { defineMessages } from 'react-intl';

const session = 'session';
const sheetsPagination = 'sheetsPagination';
const course = 'course';
const projects = 'projects';
const sessionContent = 'session.content';
const sessionWidget = 'session.widget';

export default defineMessages({
  chatTitle: {
    id: 'chatTitle',
    defaultMessage: 'Чат сессии',
  },
  leaderDisconnected: {
    id: `${session}.leaderDisconnected`,
    defaultMessage: 'Связь с ведущим потеряна. Ожидание ведущего...',
  },
  adminHasRemovedThePage: {
    id: `${sheetsPagination}.adminHasRemovedThePage`,
    defaultMessage: 'Администратор удалил лист "{title}"',
  },
  youAreNowFollowing: {
    id: `${session}.youAreNowFollowing`,
    defaultMessage: 'Вы теперь следуете за {value}',
  },
  removeByAdmin: {
    id: `${course}.removeByAdmin`,
    defaultMessage: 'Курс был удален администратором',
  },
  sessionHasBeenRemoved: {
    id: `${session}.sessionHasBeenRemoved`,
    defaultMessage: 'Сессия была удалена администратором',
  },
  unassigned: {
    id: `${session}.unassigned`,
    defaultMessage:
      'Пожалуйста, подождите. Администратор подбирает для вас команду',
  },
  projectHasBeenDeleted: {
    id: `${projects}.projectHasBeenDeleted`,
    defaultMessage: 'Проект был удалён администратором',
  },
  courseToDraft: {
    id: 'course.courseToDraft',
    defaultMessage: 'Администратор снял курс с публикации',
  },
  removeAccess: {
    id: `${course}.removeAccess`,
    defaultMessage: 'Администратор удалил вас из списка участников курса',
  },
  button: {
    id: `${session}.button`,
    defaultMessage: 'Кнопка',
  },
  PresentationNotUploaded: {
    id: `${session}.PresentationNotUploaded`,
    defaultMessage: 'Презентация не загружена',
  },
  YouTubeVideoIsMissing: {
    id: `${session}.YouTubeVideoIsMissing`,
    defaultMessage: 'Видео YouTube отсутствует',
  },
  youTubeVideoSoundWarning: {
    id: `${session}.youTubeVideoSoundWarning`,
    defaultMessage:
      'Сейчас вы будете перенаправлены в приложение для просмотра видео. После завершения необходимо будет вернуться в приложение Granatum',
  },
  googleSoundWarning: {
    id: `${session}.googleSoundWarning`,
    defaultMessage:
      'Сейчас вы будете перенаправлены в приложение для просмотра документа. После завершения необходимо будет вернуться в приложение Granatum',
  },
  GoogleDriveNotUploaded: {
    id: `${session}.GoogleDriveNotUploaded`,
    defaultMessage: 'Файл Google не загружен',
  },
  listsOfSessions: {
    id: `${session}.listsOfSessions`,
    defaultMessage: 'Листы сессии',
  },
  invalidLink: {
    id: `${session}.invalidLink`,
    defaultMessage: 'Неправильная ссылка',
  },
  sessionWillStart: {
    id: `${session}.sessionWillStart`,
    defaultMessage: 'Сессия начнется через',
  },
  days: {
    id: `${session}.days`,
    defaultMessage: 'дней',
  },
  hours: {
    id: `${session}.hours`,
    defaultMessage: 'часов',
  },
  minutes: {
    id: `${session}.minutes`,
    defaultMessage: 'минут',
  },
  seconds: {
    id: `${session}.seconds`,
    defaultMessage: 'секунд',
  },
  GoogleDriveNotUploadedDescr: {
    id: `${session}.GoogleDriveNotUploadedDescr`,
    defaultMessage: 'Выберите документ в настройках виджета.',
  },
  follow: {
    id: `${session}.follow`,
    defaultMessage: 'Перейти',
  },
  videoLinkIsInvalid: {
    id: `${session}.videoLinkIsInvalid`,
    defaultMessage: 'Ссылка не корректна, или сервис не поддерживается.',
  },
  editing: {
    id: `${sessionContent}.editing`,
    defaultMessage: 'редактирует',
  },
  youAreEditing: {
    id: `${sessionContent}.youAreEditing`,
    defaultMessage: 'Вы редактируете...',
  },
  maxLikes: {
    id: `${sessionContent}.maxLikes`,
    defaultMessage: 'Достигнуто максимальное количество лайков',
  },
  pleaseWaitStickerBeingEdited: {
    id: `${sessionContent}.pleaseWaitStickerBeingEdited`,
    defaultMessage:
      'Пожалуйста, подождите. В данный момент стикер редактируется другим пользователем',
  },
  enterText: {
    id: 'editor.enterText',
    defaultMessage: 'Введите текст...',
  },
  errorMaxAddSticker: {
    id: 'errors.errorMaxAddSticker',
    defaultMessage:
      'Невозможно добавить стикер. Достигнуто максимальное количество стикеров от пользователя или команды',
  },
  addNote: {
    id: `${sessionWidget}.addNote`,
    defaultMessage: 'Добавить стикер',
  },
  showAnswers: {
    id: 'session.showAnswers',
    defaultMessage: 'Показаны ответы',
  },
  resultsFilterOfAllTeams: {
    id: 'toolbar.sheetSettings.ofAllTeams',
    defaultMessage: 'всех команд',
  },
  resultsFilterOfAllUsers: {
    id: 'toolbar.sheetSettings.ofAllUsers',
    defaultMessage: 'всех пользователей',
  },
  remove: {
    id: 'session.remove',
    defaultMessage: 'Удалить',
  },
  move: {
    id: 'session.move',
    defaultMessage: 'Переместить',
  },
  chooseContainer: {
    id: 'session.chooseContainer',
    defaultMessage: 'Выберите контейнер',
  },
});
