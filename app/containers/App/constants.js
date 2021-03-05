const prefix = 'App';
const auth = 'Auth';
const invite = 'Invite';

export const RESET_LOADING = `${prefix}/RESET_LOADING`;
export const PUSH_LOADING = `${prefix}/PUSH_LOADING`;
export const POP_LOADING = `${prefix}/POP_LOADING`;

export const GUEST_PROBE_FAILURE = `${prefix}/GUEST_PROBE_FAILURE`;

export const LOAD_USER_DATA_REQUEST = `${auth}/LOAD_USER_DATA_REQUEST`;
export const LOAD_USER_DATA_SUCCESS = `${auth}/LOAD_USER_DATA_SUCCESS`;
export const LOAD_USER_DATA_FAILURE = `${auth}/LOAD_USER_DATA_FAILURE`;

export const SIGN_OUT_REQUEST = `${auth}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${auth}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_FAILURE = `${auth}/SIGN_OUT_FAILURE`;

export const ADD_NOTIFICATION = `${prefix}/ADD_NOTIFICATION`;
export const REMOVE_NOTIFICATION = `${prefix}/REMOVE_NOTIFICATION`;

export const SET_SOCKET_CONNECT_ERROR = `${prefix}/SET_SOCKET_CONNECT_ERROR`;
export const TOGGLE_HELP_CHAT = `${prefix}/TOGGLE_HELP_CHAT`;

export const SET_OPENED_BY_LINK = `SET_OPENED_BY_LINK`;
export const IS_QUEST = `IS_QUEST`;
export const SHOW_CONFIRM_MODAL = `SHOW_CONFIRM_MODAL`;
export const HIDE_CONFIRM_MODAL = `HIDE_CONFIRM_MODAL`;

export const GET_COURSE_ACCESS_REQUEST = `${invite}/GET_COURSE_ACCESS_REQUEST`;
export const GET_COURSE_ACCESS_SUCCESS = `${invite}/GET_COURSE_ACCESS_SUCCESS`;
export const GET_COURSE_ACCESS_FAILURE = `${invite}/GET_COURSE_ACCESS_FAILURE`;
export const GET_COURSE_REQUEST = `${invite}/GET_COURSE_REQUEST`;
export const GET_COURSE_SUCCESS = `${invite}/GET_COURSE_SUCCESS`;
export const GET_COURSE_FAILURE = `${invite}/GET_COURSE_FAILURE`;

export const CHANGE_LANG = `${prefix}/CHANGE_LANG`;
export const UPDATE_USER_FAILURE = `${prefix}/UPDATE_USER_FAILURE`;
