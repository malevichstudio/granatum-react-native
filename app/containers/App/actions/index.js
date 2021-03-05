import * as types from '../constants';

export const resetLoading = () => ({
  type: types.RESET_LOADING,
});

export const pushLoading = () => ({
  type: types.PUSH_LOADING,
});

export const popLoading = () => ({
  type: types.POP_LOADING,
});

export const loadUserDataRequest = (payload) => ({
  type: types.LOAD_USER_DATA_REQUEST,
  payload,
});

export const loadUserDataSuccess = (payload) => ({
  type: types.LOAD_USER_DATA_SUCCESS,
  payload,
});

export const loadUserDataFailure = () => ({
  type: types.LOAD_USER_DATA_FAILURE,
});

export const signOut = () => ({
  type: types.SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS,
});

export const addNotification = (payload) => ({
  type: types.ADD_NOTIFICATION,
  payload,
});

export const removeNotification = (id) => ({
  type: types.REMOVE_NOTIFICATION,
  id,
});

export const setSocketConnectError = (payload) => ({
  type: types.SET_SOCKET_CONNECT_ERROR,
  payload,
});

export const setOpenedByLink = (payload) => ({
  type: types.SET_OPENED_BY_LINK,
  payload,
});

export const showConfirmModal = (payload) => ({
  type: types.SHOW_CONFIRM_MODAL,
  payload,
});

export const hideConfirmModal = (payload) => ({
  type: types.HIDE_CONFIRM_MODAL,
  payload,
});

export const setIsQuest = (payload) => ({
  type: types.IS_QUEST,
  payload,
});

export const getCourseAccess = (payload) => ({
  type: types.GET_COURSE_ACCESS_REQUEST,
  payload,
});

export const getCourseAccessSuccess = (payload) => ({
  type: types.GET_COURSE_ACCESS_SUCCESS,
  payload,
});

export const getCourse = (payload) => ({
  type: types.GET_COURSE_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getCourseSuccess = (payload, meta) => ({
  type: types.GET_COURSE_SUCCESS,
  payload,
  meta,
});

export const toggleHelpChat = (payload) => ({
  type: types.TOGGLE_HELP_CHAT,
  payload,
});

export const changeLang = (lang) => ({
  type: types.CHANGE_LANG,
  lang: lang,
});
