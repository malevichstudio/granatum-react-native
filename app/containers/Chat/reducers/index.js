import produce from 'immer';

import {
  CHAT_TYPE_PERSONAL,
  CHAT_TYPE_TEAM,
  CHAT_TYPE_COMMON,
} from '../../../constants';
import * as types from '../constants';

function getFieldByType(type) {
  switch (type) {
    case CHAT_TYPE_COMMON:
      return 'commonChat';
    case CHAT_TYPE_PERSONAL:
      return 'personalChats';
    case CHAT_TYPE_TEAM:
      return 'teamChats';
    default:
      return '';
  }
}

export const initialState = {
  /**
   * в индивудальном чате , выводяться друг за другом сначала чаты потом юсеры,
   * юсеры выводятся если с ними еще не создан чат , когда чат создаем юсер из
   * массива users удаляется и добавляется в chat если юсер будет в обоих
   * массивах будет дублирование в списке
   */
  users: {
    content: [],
  },
  commonChatId: '',
  /**
   * {["chatId"]: {
   *   existNewMessages,
   *   id,
   *   sessionId,
   *   type,
   *   messages: {
   *     content: [MessageObject],
   *     hasNext: false,
   *     hasPrevious,
   *     totalElements
   *   }
   * }}
   */
  commonChat: new Map(),
  teamChats: new Map(),
  personalChats: new Map(),
  currentPersonalChatId: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_CHATS_SUCCESS: {
        action.payload.forEach((chat) => {
          if (chat.type === 'PERSONAL') {
            draft.personalChats.set(chat.id, chat);
          } else if (chat.type === 'TEAM') {
            draft.teamChats.set(chat.id, chat);
          } else if (chat.type === 'COMMON') {
            draft.commonChatId = chat.id;
            draft.commonChat.set(chat.id, chat);
          }
        });
        break;
      }
      case types.GET_USERS_CHATS_SUCCESS:
        if (action.payload.number === 0) {
          draft.users = action.payload;
        } else {
          draft.users.content = state.users.content.concat(
            action.payload.content,
          );
          draft.users.number = action.payload.number;
          draft.users.totalPages = action.payload.totalPages;
        }
        break;
      case types.CREATE_CHAT_MESSAGE_RECEIVE: {
        const { chatType: payloadChatType, chatId } = action.payload.message;
        const chatType = getFieldByType(payloadChatType);

        if (state[chatType].get(chatId)) {
          if (!state[chatType].get(chatId).messages.hasNext) {
            draft[chatType].get(chatId).messages.content.push({
              ...action.payload.message,
              unread: !action.payload.isSelf,
            });
            draft[chatType].get(chatId).messages.totalElements += 1;
            draft[chatType].get(chatId).existNewMessages = !action.payload
              .isSelf;
          }

          if (state[chatType].get(chatId).type === CHAT_TYPE_PERSONAL) {
            draft[chatType].get(chatId).message = action.payload.message;
          }
        }

        break;
      }
      case types.READ_CHAT_MESSAGE_SUCCESS: {
        const { chatType: payloadChatType, chatId } = action.payload;
        const chatType = getFieldByType(payloadChatType);

        let unreadBefore = false;
        draft[chatType].set(chatId, {
          ...state[chatType].get(chatId),
          existNewMessages: action.payload.existNewMessages,
          messages: {
            ...state[chatType].get(chatId).messages,
            content: state[chatType]
              .get(chatId)
              .messages.content.map((message) => {
                if (message.id === action.payload.id) {
                  unreadBefore = true;
                  return {
                    ...message,
                    unread: false,
                  };
                }
                if (!unreadBefore) {
                  return {
                    ...message,
                    unread: false,
                  };
                }

                return message;
              }),
          },
        });
        break;
      }
      case types.GET_MESSAGES_SUCCESS: {
        if (
          state[getFieldByType(action.payload.chatType)].get(
            action.payload.chatId,
          )
        ) {
          if (!action.payload.lastMessageId) {
            draft[getFieldByType(action.payload.chatType)].get(
              action.payload.chatId,
            ).messages = action.payload.data;
          } else {
            if (action.payload.direction === 'PREV') {
              draft[getFieldByType(action.payload.chatType)].get(
                action.payload.chatId,
              ).messages.content = action.payload.data.content
                .reverse()
                .concat(
                  state[getFieldByType(action.payload.chatType)].get(
                    action.payload.chatId,
                  ).messages.content,
                );
              draft[getFieldByType(action.payload.chatType)].get(
                action.payload.chatId,
              ).messages.hasPrevious = action.payload.data.hasPrevious;
            } else {
              draft[getFieldByType(action.payload.chatType)].get(
                action.payload.chatId,
              ).messages.content = state[
                getFieldByType(action.payload.chatType)
              ]
                .get(action.payload.chatId)
                .messages.content.concat(action.payload.data.content);
              draft[getFieldByType(action.payload.chatType)].get(
                action.payload.chatId,
              ).messages.hasNext = action.payload.data.hasNext;
            }

            draft[getFieldByType(action.payload.chatType)].get(
              action.payload.chatId,
            ).messages.totalElements = action.payload.data.totalElements;
          }
        }
        break;
      }
      case types.CLEAN_ALL_CHATS_RECEIVE: {
        if (state[getFieldByType(action.payload.type)].get(action.payload.id)) {
          draft[getFieldByType(action.payload.type)].set(action.payload.id, {
            ...state[getFieldByType(action.payload.type)].get(
              action.payload.id,
            ),
            message: undefined,
            existNewMessages: false,
            messages: {
              content: [],
              totalElements: 0,
            },
          });
        }
        break;
      }

      case types.CLEAR_TEAM_CHAT:
        if (state.teamChats.size > 0) {
          const index = Array.from(state.teamChats.keys()).findIndex(
            (k) => state.teamChats.get(k).teamId === action.teamId,
          );

          if (index !== -1) {
            draft.teamChats.delete(index);
          }
        }
        break;

      case types.CLEAR_TEAM_CHATS: {
        draft.teamChats = new Map();
        break;
      }

      case types.REMOVE_CHAT_RECEIVE: {
        draft[getFieldByType(action.payload.type)].delete(action.payload.id);
        break;
      }

      case types.CREATE_PERSONAL_CHAT_SUCCESS: {
        draft.personalChats.set(action.payload.id, {
          ...action.payload,
          messages: {
            content: [],
            totalElements: 0,
          },
        });
        draft.currentPersonalChatId = action.payload.id;
        break;
      }

      case types.CREATE_PERSONAL_CHAT_RECEIVE:
        // Это может быть не только новый чат. Это может быть старый чат при
        // смене типа листа с общего на командный, затем, на общий, затем опять
        // на командный
        draft[getFieldByType(action.payload.type)].set(action.payload.id, {
          ...action.payload,
          messages: {
            content: [],
            totalElements: 0,
            ...(action.payload.messages || {}),
          },
        });
        break;

      case types.SELECT_PERSONAL_CHAT:
        draft.currentPersonalChatId = action.payload.id;
        break;
      case types.LEAVE_USERS_FROM_COURSE_RECEIVE: {
        state.personalChats.forEach((value, key) => {
          if (!(value.user && !action.payload.includes(value.user.id))) {
            draft.personalChats.delete(key);
          }
        });
        draft.users.content = state.users.content.filter(
          (user) => !action.payload.includes(user.id),
        );
        break;
      }

      case types.JOIN_USERS_IN_COURSE_RECEIVE: {
        const users = [];
        // Согласно кейсу https://granatum.atlassian.net/browse/TASK-4918
        // у нас может быть ситуация, когда юзер уже находится в списке и мы
        // должны это учитывать
        if (action.payload?.length) {
          action.payload.forEach((newUser) => {
            const index = state.users.content.findIndex(
              (user) => user.id === newUser.id,
            );
            if (index === -1) {
              users.push(newUser);
            } else {
              draft.users.content[index] = {
                ...state.users[index],
                // скорее всего здесь поменяется роль
                ...newUser,
              };
            }
          });
        }

        if (users.length) {
          // здесь мы берём из драфта, потому что из-за логики выше state уже
          // может быть неактуальным
          draft.users.content = draft.users.content.concat(users);
        }
        break;
      }

      case types.UPDATE_USER_RECEIVE: {
        const index = state.users.content.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          draft.users.content[index] = {
            ...state.users.content[index],
            ...action.payload,
          };
        } else {
          const chatId = Array.from(state.personalChats.keys()).find(
            (value) =>
              state.personalChats.get(value).user &&
              state.personalChats.get(value).user.id === action.payload.id,
          );
          if (chatId) {
            draft.personalChats.set(chatId, {
              ...state.personalChats.get(chatId),
              user: {
                ...state.personalChats.get(chatId).user,
                ...action.payload,
              },
            });
          }
        }
        break;
      }

      case types.LEAVE_CHAT:
        draft.commonChatId = initialState.commonChatId;
        draft.commonChat = initialState.commonChat;
        draft.teamChats = initialState.teamChats;
        draft.personalChats = initialState.personalChats;
        draft.users = initialState.users;
        draft.currentPersonalChatId = initialState.currentPersonalChatId;
        break;
    }
  });
