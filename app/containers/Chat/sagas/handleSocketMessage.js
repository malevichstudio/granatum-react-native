import { fork, put, select } from 'redux-saga/effects';

import {
  createChatMessageReceive,
  cleanAllChatsReceive,
  leaveUsersFromCourseReceive,
  joinUsersInCourseReceive,
  updateUserReceive,
} from '../actions';
import newChatReceive from './newChatReceive';
import changeSheetTypeReceive from './changeSheetTypeReceive';
import removeChatReceive from './removeChatReceive';

function* handleChatMessages(payload) {
  switch (payload.event) {
    case 'new_message': {
      const userId = yield select((state) => state.user.id);
      yield put(
        createChatMessageReceive({
          message: payload.value,
          isSelf: payload.value.accountId === userId,
        }),
      );
      break;
    }
    case 'deleted_all_messages':
      yield put(cleanAllChatsReceive(payload.value));
      break;
    default:
      break;
  }
}

function* handleNewChatMessages(payload) {
  switch (payload.event) {
    case 'new_chat':
      yield newChatReceive(payload);
      break;
    case 'deleted':
      yield fork(removeChatReceive, payload.value);
      break;
    default:
      break;
  }
}

function* handleCourseMessages(payload) {
  switch (payload.event) {
    case 'leave':
      yield put(leaveUsersFromCourseReceive(payload.value));
      break;
    case 'join':
      yield put(joinUsersInCourseReceive(payload.value));
      break;
    default:
      break;
  }
}

function* handleUserMessages(payload) {
  switch (payload.event) {
    case 'updated':
    case 'online_in_session':
      yield put(updateUserReceive({ id: payload.targetId, ...payload.value }));
      break;
    default:
      break;
  }
}

function* handleSheetMessages(payload) {
  switch (payload.event) {
    // сменился тип листа
    case 'sheet_type_updated':
      yield changeSheetTypeReceive(payload.targetId);
      break;
    default:
      break;
  }
}

export default function* handleSocketMessages({ payload }) {
  switch (payload.target) {
    case 'message':
      yield handleChatMessages(payload);
      break;
    case 'chat':
      yield handleNewChatMessages(payload);
      break;
    case 'course':
      yield handleCourseMessages(payload);
      break;
    case 'user':
      yield handleUserMessages(payload);
      break;
    case 'sheet':
      yield handleSheetMessages(payload);
      break;
    default:
      break;
  }
}
