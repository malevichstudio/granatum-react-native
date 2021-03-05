import * as types from '../constants';

export const getChats = (payload) => ({
  type: types.GET_CHATS_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getChatsSuccess = ({ payload, meta }) => ({
  type: types.GET_CHATS_SUCCESS,
  payload,
  meta,
});

export const createChatMessage = (payload) => ({
  type: types.CREATE_CHAT_MESSAGE_REQUEST,
  payload,
  meta: { thunk: true },
});

export const createChatMessageSuccess = ({ payload, meta }) => ({
  type: types.CREATE_CHAT_MESSAGE_SUCCESS,
  payload,
  meta,
});

export const createChatMessageReceive = (payload) => ({
  type: types.CREATE_CHAT_MESSAGE_RECEIVE,
  payload,
});

export const readMessage = (payload) => ({
  type: types.READ_CHAT_MESSAGE_REQUEST,
  payload,
  meta: { thunk: true },
});

export const readMessageSuccess = ({ payload, meta }) => ({
  type: types.READ_CHAT_MESSAGE_SUCCESS,
  payload,
  meta,
});

export const getMessages = (payload) => ({
  type: types.GET_MESSAGES_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getMessagesSuccess = ({ payload, meta }) => ({
  type: types.GET_MESSAGES_SUCCESS,
  payload,
  meta,
});

export const cleanAllChats = (payload) => ({
  type: types.CLEAN_ALL_CHATS_REQUEST,
  payload,
});

export const cleanAllChatsReceive = (payload) => ({
  type: types.CLEAN_ALL_CHATS_RECEIVE,
  payload,
});

/**
 * Очистить чат команды
 * @param teamId
 * @returns {{teamId: *, type: string}}
 */
export const clearTeamChat = (teamId) => ({
  type: types.CLEAR_TEAM_CHAT,
  teamId,
});

/**
 * Удалить чаты всех команд в сторе (предполагется, что на листе)
 * @returns {{type: string}}
 */
export const clearTeamChats = () => ({
  type: types.CLEAR_TEAM_CHATS,
});

export const getPersonalChats = (payload) => ({
  type: types.GET_PERSONAL_CHATS_REQUEST,
  payload,
});

export const getPersonalChatsSuccess = (payload) => ({
  type: types.GET_PERSONAL_CHATS_SUCCESS,
  payload,
});

export const createPersonalChat = (payload) => ({
  type: types.CREATE_PERSONAL_CHAT_REQUEST,
  payload,
  meta: { thunk: true },
});

export const createPersonalChatSuccess = ({ payload, meta }) => ({
  type: types.CREATE_PERSONAL_CHAT_SUCCESS,
  payload,
  meta,
});

export const removeChatReceive = (payload) => ({
  type: types.REMOVE_CHAT_RECEIVE,
  payload,
});

export const selectPersonalChat = (payload) => ({
  type: types.SELECT_PERSONAL_CHAT,
  payload,
});

export const createPersonalChatReceive = (payload) => ({
  type: types.CREATE_PERSONAL_CHAT_RECEIVE,
  payload,
});

export const leaveUsersFromCourseReceive = (payload) => ({
  type: types.LEAVE_USERS_FROM_COURSE_RECEIVE,
  payload,
});

export const joinUsersInCourseReceive = (payload) => ({
  type: types.JOIN_USERS_IN_COURSE_RECEIVE,
  payload,
});

export const updateUserReceive = (payload) => ({
  type: types.UPDATE_USER_RECEIVE,
  payload,
});

export const leaveChat = (payload) => ({
  type: types.LEAVE_CHAT,
  payload,
});

export const getUsers = (payload) => ({
  type: types.GET_USERS_CHATS_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getUsersSuccess = ({ payload, meta }) => ({
  type: types.GET_USERS_CHATS_SUCCESS,
  payload,
  meta,
});
