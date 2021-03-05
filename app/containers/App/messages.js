import { defineMessages } from 'react-intl';

const validation = 'errors.validation';

export default defineMessages({
  accessDenied: {
    id: 'errors.accessToPageDenied',
    defaultMessage: 'Доступ к странице запрещён',
  },
  dateEndShouldBeManyDateStart: {
    id: 'errors.validation.dateEndShouldBeManyDateStart',
    defaultMessage: 'Окончание сессии не может быть раньше начала',
  },
  dateShouldBeManyNow: {
    id: 'errors.validation.dateShouldBeManyNow',
    defaultMessage: 'Дата и время должны быть больше текущего',
  },
  agreementMustBeChecked: {
    id: 'errors.validation.agreementMustBeChecked',
    defaultMessage: 'Пожалуйста, поставьте галку, чтобы продолжить',
  },
  projectNameExist: {
    id: 'errors.backend.project.projectNameExist',
    defaultMessage: 'Проект с таким именем уже существует',
  },
  userNotInProject: {
    id: 'errors.backend.project.userNotInProject',
    defaultMessage: 'Пользователь не добавлен в проект',
  },
  projectNotFound: {
    id: 'errors.backend.project.projectNotFound',
    defaultMessage: 'Запрошенный проект не найден. Возможно он уже удален',
  },
  courseNotFound: {
    id: 'errors.backend.project.courseNotFound',
    defaultMessage: 'Запрошенный курс не найден. Возможно он уже удален',
  },
  sessionNotFound: {
    id: 'errors.backend.project.sessionNotFound',
    defaultMessage: 'Запрошенная сессия не найдена. Возможно она уже удалена',
  },
  sessionFontPairNotFound: {
    id: 'errors.backend.project.sessionFontPairNotFound',
    defaultMessage:
      'Запрошенная пара шрифтов не найдена. Возможно она уже удалена',
  },
  sessionAlreadyStarted: {
    id: 'errors.backend.project.sessionAlreadyStarted',
    defaultMessage: 'Сессия уже начата ранее',
  },
  hasUnfinishedPreviousSessions: {
    id: 'errors.backend.project.hasUnfinishedPreviousSessions',
    defaultMessage:
      'Для того, чтобы начать эту сессию, необходимо сначала пройти все предыдущие',
  },
  maxNumberOfParticipants: {
    id: 'errors.backend.project.maxNumberOfParticipants',
    defaultMessage: 'Максимальное количество участников в курсе превышено',
  },
  oneOrFewBlocksNotFound: {
    id: 'errors.backend.project.oneOrFewBlocksNotFound',
    defaultMessage: 'Невозможно вставить блок, так как он был удален',
  },
  inviteNotFound: {
    id: 'errors.backend.project.inviteNotFound',
    defaultMessage:
      'Ссылка-инвайт некорректна. Попробуйте перейти по ссылке повторно или обратитесь в техподдержку',
  },
  courseStatusDraft: {
    id: 'errors.backend.project.courseStatusDraft',
    defaultMessage:
      'Курс находится в статусе Черновик. Обратитесь к владельцу курса.',
  },
  passwordsDontMatch: {
    id: 'errors.backend.account.passwordsDontMatch',
    defaultMessage: 'Пароли не совпадают',
  },
  oldPasswordDoesNotMatch: {
    id: 'errors.backend.account.oldPasswordDoesNotMatch',
    defaultMessage: 'Неверный пароль',
  },
  userAlreadyExist: {
    id: 'errors.backend.account.userAlreadyExist',
    defaultMessage:
      'Пользователь с таким адресом электронной почты уже существует',
  },
  updateFail: {
    id: 'errors.backend.account.updateFail',
    defaultMessage: 'Ошибка обновления профиля, обратитесь к администратору',
  },
  emailNotFound: {
    id: 'errors.backend.account.emailNotFound',
    defaultMessage:
      'Пользователя с таким адресом электронной почты не существует',
  },
  providerUnsupported: {
    id: 'errors.backend.account.oauth.providerUnsupported',
    defaultMessage: 'Регистрация через эту социальную сеть не поддерживается',
  },
  alreadyBind: {
    id: 'errors.backend.account.oauth.alreadyBind',
    defaultMessage: 'Ваш профиль уже связан с этой социальной сетью.',
  },
  bindFail: {
    id: 'errors.backend.account.oauth.bindFail',
    defaultMessage:
      'Ошибка подключения социальной сети, обратитесь к администратору',
  },
  unbindFail: {
    id: 'errors.backend.account.oauth.unbindFail',
    defaultMessage:
      'Ошибка отключения социальной сети, обратитесь к администратору',
  },
  lastSheetInSession: {
    id: 'errors.backend.constructor.lastSheetInSession',
    defaultMessage:
      'Невозможно удалить лист, так как в сессии всегда должен быть хотя бы один лист',
  },
  contentNotFound: {
    id: 'errors.backend.constructor.contentNotFound',
    defaultMessage: 'Запрошенный контейнер не найден. Возможно он уже удален',
  },
  invitedVerifyTokenL: {
    id: 'errors.backend.account.invalidVerifyToken',
    defaultMessage:
      'Ссылка для подтверждения просрочена. Обратитесь в техподдержку для подтверждения аккаунта',
  },
  surveyCannotBeStarted: {
    id: 'errors.backend.survey.surveyCannotBeStarted',
    defaultMessage: 'Еще нет ни одного вопроса',
  },
  cardCannotBeMoved: {
    id: 'errors.backend.survey.cardCannotBeMoved',
    defaultMessage: 'Карточка уже занята другим участником команды',
  },
  indexDuplicate: {
    id: 'errors.backend.survey.indexDuplicate',
    defaultMessage: 'Не получилось добавить элемент. Попробуйте еще раз.',
  },
  fieldIsRequired: {
    id: 'errors.validation.fieldIsRequired',
    defaultMessage: 'Поле, обязательное для заполнения',
  },
  incorrectEmailAddress: {
    id: 'errors.validation.incorrectEmailAddress',
    defaultMessage: 'Неверный адрес электронной почты',
  },
  addedToProject: {
    id: 'account.addedToProject',
    defaultMessage: 'Вы были добавлены в проект "{project}"',
  },
  removedFromProject: {
    id: 'account.removedFromProject',
    defaultMessage: 'Вы были удалены из проекта "{project}"',
  },
  warnInvokeToSession: {
    id: 'session.warnInvokeToSession',
    defaultMessage:
      'Администратор вызывает вас на сессию "{name}". Переход будет осуществлен через 5 сек',
  },
  invalidCharacters: {
    id: `${validation}.invalidCharacters`,
    defaultMessage: 'Поле содержит недопустимые символы',
  },
  fieldMaxLength: {
    id: `${validation}.fieldMaxLength`,
    defaultMessage: 'Длина поля не может превышать {value} символов',
  },
  passwordMustBeAtLeast8CharactersLong: {
    id: `${validation}.passwordMustBeAtLeast8CharactersLong`,
    defaultMessage: 'Пароль должен быть не короче восьми символов',
  },
  passwordMustIncludeRequirements: {
    id: `${validation}.passwordMustIncludeRequirements`,
    defaultMessage: 'Пароль содержит недопустимые символы',
  },
  passwordMustHaveLatinLetters: {
    id: `${validation}.passwordMustHaveLatinLetters`,
    defaultMessage: 'Пароль должен содержать букву латинского алфавита',
  },
  passwordMustBeAtLeast1Number: {
    id: `${validation}.passwordMustBeAtLeast1Number`,
    defaultMessage: 'Пароль должен содержать как минимум 1 цифру',
  },
  passwordMustHaveSpecialSymbol: {
    id: `${validation}.passwordMustHaveSpecialSymbol`,
    defaultMessage: 'Пароль должен содержать спецсимвол:',
  },
});
