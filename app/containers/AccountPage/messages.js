import { defineMessages } from 'react-intl';

const projects = 'projects';
const course = 'course';
const account = 'account';

const appSettings = 'appSettings';
export default defineMessages({
  projectsTitle: {
    id: `${projects}.projectsTitle`,
    defaultMessage: 'Проекты',
  },
  project: {
    id: `${projects}.project`,
    defaultMessage: 'Проект',
  },
  removeAccess: {
    id: `${course}.removeAccess`,
    defaultMessage: 'Администратор удалил вас из списка участников курса',
  },
  courseToDraft: {
    id: 'course.courseToDraft',
    defaultMessage: 'Администратор снял курс с публикации',
  },
  myCourses: {
    id: `${projects}.myCourses`,
    defaultMessage: 'Мои курсы',
  },
  countSessions: {
    id: `${projects}.countSessions`,
    defaultMessage: 'Количество сессий',
  },
  mySessions: {
    id: `${projects}.mySessions`,
    defaultMessage: 'Мои сессии',
  },
  knowledgeBase: {
    id: 'ui.knowledgeBase',
    defaultMessage: 'База знаний',
  },
  numberOfSessions: {
    id: `${projects}.numberOfSessions`,
    defaultMessage: 'Сессий',
  },
  help: {
    id: 'help.help',
    defaultMessage: 'Помощь',
  },
  session: {
    id: `${projects}.session`,
    defaultMessage: 'Сессия',
  },
  settings: {
    id: `${appSettings}.settings`,
    defaultMessage: 'Настройки',
  },
  language: {
    id: `${appSettings}.language`,
    defaultMessage: 'Язык',
  },
  profile: {
    id: `${account}.profile`,
    defaultMessage: 'Профиль',
  },
  generalInfo: {
    id: `${account}.generalInfo`,
    defaultMessage: 'Основная информация',
  },
  changePassword: {
    id: `${account}.changePassword`,
    defaultMessage: 'Изменить пароль',
  },
  linkedAccounts: {
    id: `${account}.linkedAccounts`,
    defaultMessage: 'Связанные соцсети',
  },
});
