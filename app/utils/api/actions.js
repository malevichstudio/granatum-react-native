const createOrUpdate = '@@websocket-api/CREATE_OR_UPDATE_CHANNEL';
const close = '@@websocket-api/CLOSE_CHANNEL';
const closeSocketConnect = '@@websocket-api/CLOSE__SOCKET_CONNECT';
const receiveSessionMessageType = '@@websocket-api/RECEIVE_SESSION_MESSAGE';
const receiveProjectMessageType = '@@websocket-api/RECEIVE_PROJECT_MESSAGE';
const receiveUserMessageType = '@@websocket-api/RECEIVE_USER_MESSAGE';
const receiveCourseMessageType = '@@websocket-api/RECEIVE_COURSE_MESSAGE';
const receiveTeamChatMessageType = '@@websocket-api/RECEIVE_TEAM_CHAT_MESSAGE';
const receivGlobalAdminMessageType =
  '@@websocket-api/RECEIVE_GLOBAL_ADMIN_MESSAGE';

export function createOrUpdateChannel(channel, data) {
  return {
    type: createOrUpdate,
    payload: {
      channel,
      data,
    },
  };
}

export function closeChannel(channel) {
  return {
    type: close,
    payload: {
      channel,
    },
  };
}

export function closeConnect() {
  return {
    type: closeSocketConnect,
  };
}

export const receiveSessionMessage = payload => ({
  type: receiveSessionMessageType,
  payload,
});

export const receiveProjectMessage = payload => ({
  type: receiveProjectMessageType,
  payload,
});

export const receiveUserMessage = payload => ({
  type: receiveUserMessageType,
  payload,
});

export const receiveCourseMessage = payload => ({
  type: receiveCourseMessageType,
  payload,
});

export const receiveTeamChatMessage = payload => ({
  type: receiveTeamChatMessageType,
  payload,
});

export const receiveGlobalAdminMessage = payload => ({
  type: receivGlobalAdminMessageType,
  payload,
});

createOrUpdateChannel.toString = () => createOrUpdate;
closeChannel.toString = () => close;
closeConnect.toString = () => closeSocketConnect;
receiveSessionMessage.toString = () => receiveSessionMessageType;
receiveProjectMessage.toString = () => receiveProjectMessageType;
receiveUserMessage.toString = () => receiveUserMessageType;
receiveCourseMessage.toString = () => receiveCourseMessageType;
receiveTeamChatMessage.toString = () => receiveTeamChatMessageType;
receiveGlobalAdminMessage.toString = () => receivGlobalAdminMessageType;
