import { createSelector } from 'reselect';

import { selectTeam } from 'app/containers/SessionPage/selectors';
import { injectionKeys } from 'app/config';
import {
  CHAT_TYPE_COMMON,
  CHAT_TYPE_PERSONAL,
  CHAT_TYPE_TEAM,
} from '../../constants';
import { initialState } from './reducers';

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

const selectChatsDomain = (state) => state[injectionKeys.chats] || initialState;

const selectChats = createSelector(
  selectChatsDomain,
  (subState) => subState.chats,
);

export const selectCommonChat = createSelector(
  selectChatsDomain,
  (chats) => chats.commonChat.get(chats.commonChatId) || {},
);

export const selectTeamChats = createSelector(selectChatsDomain, (chats) =>
  Array.from(chats.teamChats.values()),
);

export const selectPersonalChats = createSelector(selectChatsDomain, (chats) =>
  Array.from(chats.personalChats.values()),
);

export const selectCommonChatIsUnreadMessages = createSelector(
  selectCommonChat,
  (subState) => (subState ? subState.existNewMessages : false),
);

export const selectPersonalChatsIsUnreadMessages = createSelector(
  selectPersonalChats,
  (subState) =>
    subState
      ? subState.find(({ existNewMessages }) => existNewMessages)
      : false,
);

export const selectCommandChatsIsUnreadMessages = createSelector(
  selectTeamChats,
  (chats) =>
    !!chats.find(
      ({ existNewMessages, type }) =>
        existNewMessages && type === CHAT_TYPE_TEAM,
    ),
);

export const selectIsUnreadMessages = createSelector(
  [
    selectCommonChatIsUnreadMessages,
    selectPersonalChatsIsUnreadMessages,
    selectCommandChatsIsUnreadMessages,
  ],
  (commonChat, personalChat, commandChat) =>
    commonChat || personalChat || commandChat,
);

export const selectUnreadMessagesCount = createSelector(
  selectChats,
  (chats) => {
    let count = 0;
    chats.forEach((chat) => {
      if (chat.existNewMessages) {
        count += chat?.messages?.content.reduce((acc, current) => {
          if (current?.unread) return acc + 1;
          return acc;
        }, 0);
      }
    });
    return count;
  },
);

export const selectCurrentTeamChat = createSelector(
  [selectChatsDomain, selectTeam],
  (chats, team) => {
    if (team) {
      return Array.from(chats.teamChats.values()).find(
        ({ teamId, type }) => teamId === team.id && type === CHAT_TYPE_TEAM,
      );
    }
    return null;
  },
);

export const selectUsers = createSelector(
  selectChatsDomain,
  (subState) => subState.users,
);

export const selectCurrentPersonalChatId = createSelector(
  selectChatsDomain,
  (subState) => subState.currentPersonalChatId,
);

export const selectCurrentPersonalChat = createSelector(
  [selectPersonalChats, selectCurrentPersonalChatId],
  (chats, chatId) => (chatId ? chats.find(({ id }) => id === chatId) : false),
);

export const makeSelectChat = (id, type) =>
  createSelector(selectChatsDomain, (chats) =>
    chats[getFieldByType(type)].get(id),
  );
