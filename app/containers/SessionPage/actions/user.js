import * as types from '../constants';

export const refreshUserPage = (payload) => ({
  type: types.REFRESH_USER_PAGE_REQUEST,
  payload,
});

export const getOnlineUsers = (payload) => ({
  type: types.GET_ONLINE_USERS_REQUEST,
  payload,
});

export const getOnlineUsersSuccess = (payload) => ({
  type: types.GET_ONLINE_USERS_SUCCESS,
  payload,
});

export const invokeUserToSession = (payload) => ({
  type: types.INVOKE_USER_TO_SESSION_REQUEST,
  payload,
});

export const toogleWaitUserByAdmin = (payload) => ({
  type: types.TOOGLE_WAIT_USER_BY_ADMIN,
  payload,
});

export const onlineUserReceive = (payload) => ({
  type: types.ONLINE_USER_RECEIVE,
  payload,
});

export const joinToCourseUserReceive = (payload) => ({
  type: types.JOIN_TO_COURSE_USER_RECEIVE,
  payload,
});

export const leaveFromCourseUserReceive = (payload) => ({
  type: types.LEAVE_FROM_COURSE_USER_RECEIVE,
  payload,
});

export const disconnectUserReceive = (payload) => ({
  type: types.DISCONNECT_USER_RECEIVE,
  payload,
});
