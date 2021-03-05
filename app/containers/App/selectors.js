/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';
import { userInitialState } from './reducers/user';
import { DEFAULT_LOCALE } from '../../i18n';
import { injectionKeys } from 'app/config';

const selectSessionDomain = (state) =>
  state[injectionKeys.registerCourse] || initialState;

export const selectCourse = createSelector(
  selectSessionDomain,
  (subState) => subState.invite.course,
);

export const selectProjectId = createSelector(
  selectSessionDomain,
  (subState) => subState.invite.projectId,
);

export const selectApp = (state) => state.app || initialState;
export const selectUser = (state) =>
  state.user?.id ? state.user : userInitialState;

export const selectUserId = createSelector([selectUser], (user) => user.id);
export const selectUserLang = createSelector([selectUser], (user) => user.lang);
export const selectNotifications = createSelector(
  [selectApp],
  (app) => app.notifications,
);

export const selectHintMobileWebcamRestriction = createSelector(
  selectUser,
  (user) => user.hints.mobileWebcamRestriction,
);

export const selectSocketConnectError = createSelector(
  selectApp,
  (app) => app.socketConnectError,
);

export const selectConfirmModal = createSelector(
  selectApp,
  (app) => app.confirmModal,
);

export const selectHelpChatOpen = createSelector(
  selectApp,
  (app) => app.helpChatOpen,
);

export const selectJivoTracking = createSelector(
  selectApp,
  (app) => app.jivoTracking,
);

export const makeSelectLocation = () =>
  createSelector(selectRouter, (routerState) => routerState.location);

export const selectOpenedByLink = createSelector(
  selectApp,
  (app) => app.openedByLink,
);

export const selectIsQuest = createSelector(selectApp, (app) => app.isQuest);

export const selectIsRegistrationActivation = createSelector(
  selectApp,
  (app) => app.isRegistrationActivation,
);

export const selectUserLanguage = createSelector(
  selectUser,
  (userState) => userState.lang || DEFAULT_LOCALE,
);

export const selectUseRtl = createSelector(
  selectUserLanguage,
  (lang) => lang === 'he',
);
