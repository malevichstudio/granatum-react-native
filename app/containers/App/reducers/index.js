import produce from 'immer';
import { uid } from 'react-uid';
import * as types from '../constants';
import { parseUrl } from 'app/utils/strings';

// The initial state of the App
export const initialState = {
  loading: false,
  helpChatOpen: false,
  jivoTracking: null,
  notifications: [],
  confirmModal: null,
  socketConnectError: {
    status: false,
    reload: false,
  },
  openedByLink: null,
  isQuest: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.ADD_NOTIFICATION:
        const notification = { ...action.payload };
        notification.id = uid(action.payload);
        draft.notifications.push(notification);
        break;
      case types.SET_OPENED_BY_LINK:
        draft.openedByLink = parseUrl(action.payload);
        break;
      case types.IS_QUEST:
        draft.isQuest = action.payload;
        break;
      case types.SHOW_CONFIRM_MODAL:
        draft.confirmModal = { ...action.payload, visible: true };
        break;
      case types.HIDE_CONFIRM_MODAL:
        draft.confirmModal = null;
        break;
    }
    switch (action.type) {
      case types.REMOVE_NOTIFICATION:
        draft.notifications = state.notifications.filter(
          (notification) => notification.id !== action.id,
        );
        break;
      case types.SET_SOCKET_CONNECT_ERROR:
        draft.socketConnectError = {
          ...state.socketConnectError,
          ...action.payload,
        };
        break;
      case types.TOGGLE_HELP_CHAT:
        draft.helpChatOpen = !state.helpChatOpen;
        draft.jivoTracking = !state.helpChatOpen ? { ...action.payload } : null;
        break;
    }
    switch (action.type) {
      case types.GET_COURSE_SUCCESS:
        draft.course = action.payload;
        break;

      case types.GET_COURSE_ACCESS_REQUEST:
        draft.projectId = null;
        break;

      case types.GET_COURSE_ACCESS_SUCCESS:
        draft.projectId = action.payload;
        break;

      case types.GET_COURSE_ACCESS_FAILURE:
        draft.projectId = false;
        break;
    }
  });

export default appReducer;
