import API from './utils/api';
import ENV from '../env';

const url = `${ENV.API_HOST}:${ENV.API_PORT}`;
const resourcesUrl = `${ENV.RESOURCES_HOST}:${ENV.RESOURCES_PORT}`;

export const api = new API({ url });
export const resourcesApi = new API({ url: resourcesUrl });

resourcesApi.createEntity({ name: 'resources/projects/{id}/files', id: true });

export const spreadsheetsUrl = ENV.API_SPREADSHEETS_HOST;

// all api endpoints must be added here
// @see: https://api.granatum.solutions/swagger-ui.html
api.createEntity({ name: 'account/confirm' });
api.createEntity({ name: 'account/checkAccess/course' });
api.createEntity({ name: 'account/login' });
api.createEntity({ name: 'account/login/google' });
api.createEntity({ name: 'account' });
api.createEntity({ name: 'account/password' });
api.createEntity({ name: 'account/refresh' });
api.createEntity({ name: 'account/registration' });
api.createEntity({ name: 'account/registration/complete' });
api.createEntity({ name: 'account/revoke' });
api.createEntity({ name: 'account/password/restore' });
api.createEntity({ name: 'account/email/confirm' });
api.createEntity({ name: 'account/login/google' });
api.createEntity({ name: 'account/login/vk' });
api.createEntity({ name: 'account/login/fb' });
api.createEntity({ name: 'account' });
api.createEntity({ name: 'account/revoke' });
api.createEntity({ name: 'account/password' });
api.createEntity({ name: 'account/bind' });
api.createEntity({ name: 'account/unbind' });
api.createEntity({ name: 'account/autocomplete/country' });
api.createEntity({ name: 'account/autocomplete/city' });
api.createEntity({ name: 'account/avatar' });
api.createEntity({ name: 'account/session/refresh' });
api.createEntity({ name: 'account/registration/oauth' });
api.createEntity({ name: 'account/panel' });
api.createEntity({ name: 'account/password/token' });
api.createEntity({ name: 'guest/probe' });
api.createEntity({ name: 'guest/account' });

api.createEntity({ name: 'constructor/blocks' });
api.createEntity({ name: 'constructor/blocks/duplicate' });
api.createEntity({ name: 'constructor/blocks/{id}/team-relation', id: true });
api.createEntity({ name: 'constructor/blocks/{id}/widgets', id: true });
api.createEntity({ name: 'constructor/blocks/layout' });
api.createEntity({ name: 'constructor/blocks/copy' });
api.createEntity({ name: 'constructor/sessions/{id}/sheets', id: true });
api.createEntity({ name: 'constructor/sheets' });
api.createEntity({ name: 'constructor/sheets/{id}', id: true, postfix: 'One' });
api.createEntity({ name: 'constructor/sheets/{id}/blocks', id: true });
api.createEntity({ name: 'constructor/sheets/{id}/content', id: true });
api.createEntity({ name: 'constructor/sheets/{id}/widgets', id: true });
api.createEntity({ name: 'constructor/widgets' });
api.createEntity({ name: 'constructor/widgets/{id}/content', id: true });
api.createEntity({ name: 'constructor/content' });
api.createEntity({ name: 'constructor/sessions/{id}/blocks', id: true });
api.createEntity({ name: 'constructor/sessions/{id}/task-blocks', id: true });
api.createEntity({ name: 'constructor/blocks/link' });
api.createEntity({
  name: 'constructor/widgets/{id}/presentation',
  id: true,
});
api.createEntity({
  name: 'constructor/widgets/{id}/presentation/page',
  id: true,
});
api.createEntity({ name: 'constructor/widgets/{id}/drawing', id: true });
api.createEntity({ name: 'constructor/sticker/{id}/like', id: true });
api.createEntity({
  name: 'constructor/widgets/googledrive/{id}/modal',
  id: true,
});

api.createEntity({ name: 'constructor/timers' });
api.createEntity({ name: 'constructor/sheets/{id}/timers', id: true });
api.createEntity({ name: 'constructor/timers/append' });
api.createEntity({ name: 'constructor/timers/toggle' });

api.createEntity({ name: 'teamsets' });
api.createEntity({ name: 'teamsets/{id}', id: true, postfix: 'One' });
api.createEntity({ name: 'teamsets/{id}/users', id: true });
api.createEntity({ name: 'teamsets/teams' });
api.createEntity({ name: 'teamsets/teams/{id}/users', id: true });
api.createEntity({ name: 'teamsets/teams/users' });
api.createEntity({ name: 'teamsets/redistribute' });
api.createEntity({ name: 'teamsets/sheet/{id}', id: true, postfix: 'One' });

api.createEntity({ name: 'projects/{id}/users', id: true });
api.createEntity({ name: 'projects/{id}/courses', id: true });
api.createEntity({ name: 'projects/{id}/courses/categories', id: true });
api.createEntity({ name: 'courses' });
api.createEntity({ name: 'courses/{id}', id: true, postfix: 'One' });
api.createEntity({ name: 'public/courses/{id}', id: true, postfix: 'One' });
api.createEntity({ name: 'courses/{id}/users', id: true });
api.createEntity({ name: 'courses/{id}/users/search', id: true });
api.createEntity({ name: 'courses/{id}/status', id: true });
api.createEntity({ name: 'courses/{id}/sessions', id: true });
api.createEntity({ name: 'courses/{id}/users/online', id: true });
api.createEntity({ name: 'courses/invite/{id}', id: true });

api.createEntity({ name: 'projects' });
api.createEntity({ name: 'projects/{id}', id: true, postfix: 'One' });

api.createEntity({ name: 'sessions' });
api.createEntity({ name: 'sessions/fonts' });
api.createEntity({ name: 'sessions/theme' });
api.createEntity({ name: 'sessions/font' });
api.createEntity({ name: 'sessions/pinned' });
api.createEntity({ name: 'sessions/{id}', id: true, postfix: 'One' });
api.createEntity({ name: 'sessions/{id}/members', id: true });
api.createEntity({ name: 'sessions/{id}/speaker', id: true });
api.createEntity({ name: 'sessions/{id}/start', id: true });

api.createEntity({ name: 'sessions/{id}/passing', id: true });
api.createEntity({ name: 'sessions/{id}/device', id: true });
api.createEntity({ name: 'sessions/{id}/begin', id: true });
api.createEntity({ name: 'sessions/{id}/complete', id: true });
api.createEntity({ name: 'sessions/{id}/broadcast', id: true });
api.createEntity({ name: 'sessions/users/invoke' });
api.createEntity({ name: 'sessions/copy' });

api.createEntity({ name: 'admin/account' });
api.createEntity({ name: 'admin/accounts' });
api.createEntity({ name: 'admin/accounts/{id}', id: true, postfix: 'One' });
api.createEntity({ name: 'admin/accounts/info' });
api.createEntity({ name: 'admin/account/{id}/confirm', id: true });
api.createEntity({ name: 'admin/account/{id}/resend', id: true });
api.createEntity({ name: 'admin/account/{id}/password', id: true });
api.createEntity({ name: 'admin/accounts/{id}/avatar', id: true });

api.createEntity({ name: 'chats' });
api.createEntity({ name: 'chats/{id}/messages', id: true });
api.createEntity({ name: 'messages/{id}/read', id: true });
api.createEntity({ name: 'chats/{id}/messages', id: true });
api.createEntity({ name: 'sessions/{id}/messages', id: true });
api.createEntity({ name: 'sessions/{id}/chats/personals', id: true });
api.createEntity({ name: 'sessions/{id}/chats', id: true });
api.createEntity({ name: 'sessions/{id}/users', id: true });
api.createEntity({ name: 'sessions/{id}/users/filter', id: true });

api.createEntity({ name: 'tests/questions' });
api.createEntity({ name: 'tests/answers' });
api.createEntity({ name: 'tests/{id}/start', id: true });
api.createEntity({ name: 'tests/answers/choose', id: true });
api.createEntity({ name: 'tests/questions/submit', id: true });
api.createEntity({ name: 'tests/{id}/finish', id: true });
api.createEntity({ name: 'tests/questions/next', id: true });
api.createEntity({ name: 'tests/statistics' });
api.createEntity({ name: 'tests/questions/rate' });

api.createEntity({ name: 'webinar' });
api.createEntity({ name: 'webinar/{id}/speakers', id: true });
api.createEntity({ name: 'webinar/{id}/users', id: true });

api.createEntity({ name: 'report/sessions/{id}/mailbox', id: true });

export const webinarUrl = (roomId) => `${ENV.WEBINAR_HOST}/hls/${roomId}.m3u8`;

// we keep all injection keys at one place
export const injectionKeys = {
  app: 'app',
  ui: 'ui',
  // password recovery
  recovery: 'recovery',
  signIn: 'signIn',
  signUp: 'signUp',
  passing: 'passing',
  signUpSocial: 'signUpSocial',
  signUpGuest: 'signUpGuest',
  restore: 'restore',
  signUpConfirm: 'signUpConfirm',
  welcome: 'welcome',
  registerCourse: 'registerCourse',
  signInViaSocials: 'signInViaSocials',
  session: 'session',
  teamManagement: 'teamManagement',
  videoChat: 'videoChat',
  webinar: 'webinar',
  courses: 'courses',
  course: 'course',
  courseSettings: 'courseSettings',
  courseAccess: 'courseAccess',
  profile: 'profile',
  projects: 'projects',
  project: 'project',
  projectSettings: 'projectSettings',
  sessions: 'sessions',
  admin: 'admin',
  adminUsers: 'adminUsers',
  chats: 'chats',
  settings: 'appSettings',
};

// application routes
export const routes = {
  notFound: '/404',
  unSupportedBrowser: '/unsupported-browser',
  login: '/login/:courseToken?/:sessionId?',
  registerSocials: '/register-socials/:courseToken?/:sessionId?',
  registerCourse: '/register-course/:courseToken?/:courseId?/:sessionId?',
  registerCourseSocial:
    '/register-course/:courseToken?/:courseId?/:sessionId?/social',
  registerCourseEmail:
    '/register-course/:courseToken?/:courseId?/:sessionId?/email',
  registerCourseSuccess:
    '/register-course/:courseToken?/:courseId?/:sessionId?/success',
  registerCourseLogin:
    '/register-course/:courseToken?/:courseId?/:sessionId?/login',
  register: '/register/:courseToken?/:sessionId?',
  registerSuccess: '/register-success',
  registerConfirm: '/confirm/:token',
  registerFinishing:
    '/register-finishing/:token/:projectId?/:courseId?/:sessionId?',
  authSocialsCallback: '/auth/:type(google|fb|vk)/callback',
  // password recovery
  recovery: '/recovery',
  recoverySuccess: '/recovery-success',
  restore: '/restore/:token',
  main: {
    course: {
      index: '/projects/:projectId/course/:courseId',
      create: '/projects/:projectId/course/create',
      settings: '/projects/:projectId/course/:courseId/settings',
      sessions: '/projects/:projectId/course/:courseId/sessions',
      passing:
        '/projects/:projectId/course/:courseId/session/:sessionId/passing',
      access: '/projects/:projectId/course/:courseId/access',
    },
    project: {
      index: '/project/:projectId',
      create: '/project/create',
      settings: '/project/:projectId/settings',
      courses: '/project/:projectId/courses',
    },
    projects: '/projects',
    session: '/session/:sessionId/sheet/:sheetId?',
  },
  initial: '/projects',
  profile: '/profile',
  welcome: '/welcome',
  mediaSettings: '/media-settings',
  admin: {
    users: '/admin/users',
    createUser: '/admin/user/create',
    editUser: '/admin/user/edit/:userId',
  },
  knowledge: {
    index: '/knowledge',
    requirements: '/knowledge/requirements',
  },
  cookiesBlocked: '/cookies-blocked',
};

export const authProviders = {
  password: {
    apiSlug: 'PASSWORD',
  },
  google: {
    apiSlug: 'GOOGLE',
  },
  vk: {
    apiSlug: 'VK',
  },
  fb: {
    apiSlug: 'FACEBOOK',
  },
};

/**
 * Максимальное количество одновременно вещающих в режиме вебинар
 * @type {number}
 */
export const MAX_WEBINAR_SPEAKERS_NUMBER = 1;

// Это таблица соответствий цветов шрифта к цвету фона
// Подробнее: кейс 2.19 пункт 2 "Правила сочетания цветов"
export const sessionColorsRelationships = {
  // [0] - Цвет текста по умолчанию (Default text
  // Secondary button (text)
  // Disabled Secondary button (text)
  // Input title
  // Input border
  // Input bg
  // Input placeholder
  // Input text
  // Dropdown text
  // Dropdown icon (^ | v)
  // Dropzone bg
  // Dropzone border
  // Dropzone text
  // Select label
  // Select disabled label
  // Select disabled inactive icon bg
  // Table border
  // Table head text
  // Table head icon
  // Table text)
  // [1, 2, 3] - Варианты цвета текста (какие цвета можно выбрать)
  // [4] - Primary button (bg)
  // Secondary button (bg)
  // Disabled Secondary button (bg)
  // Text button (text)
  // Disabled Primary button (bg)
  // Title required mark
  // Dropdown focused border
  // Select active icon bg
  // Select disabled active icon bg
  // [5] - Table head bg
  colorOne: [
    'colorFive',
    'colorThree',
    'colorFour',
    'colorFive',
    'colorThree',
    'colorFive',
  ],
  colorTwo: [
    'colorFive',
    'colorThree',
    'colorFour',
    'colorFive',
    'colorThree',
    'colorFive',
  ],
  colorThree: [
    'colorOne',
    'colorOne',
    'colorTwo',
    'colorFour',
    'colorFour',
    'colorOne',
  ],
  colorFour: [
    'colorOne',
    'colorOne',
    'colorTwo',
    'colorThree',
    'colorThree',
    'colorThree',
  ],
  colorFive: [
    'colorOne',
    'colorOne',
    'colorTwo',
    'colorThree',
    'colorThree',
    'colorOne',
  ],
};

export const columns = { md: 6, sm: 6, xs: 2 };

export const colorsNames = [
  'colorOne',
  'colorTwo',
  'colorThree',
  'colorFour',
  'colorFive',
];
