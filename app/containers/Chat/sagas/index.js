import { takeEvery, debounce } from 'redux-saga/effects';

import {
  receiveSessionMessage,
  receiveUserMessage,
  receiveTeamChatMessage,
} from '../../../utils/api/actions';

import getChats from './getChats';
import createChatMessage from './createChatMessage';
import readMessage from './readMessage';
import handleSocketMessage from './handleSocketMessage';
import getMessages from './getMessages';
import * as types from '../constants';

export default function* saga() {
  yield takeEvery(types.GET_CHATS_REQUEST, getChats);
  yield takeEvery(types.CREATE_CHAT_MESSAGE_REQUEST, createChatMessage);
  yield debounce(300, types.READ_CHAT_MESSAGE_REQUEST, readMessage);
  yield takeEvery(receiveSessionMessage.toString(), handleSocketMessage);
  yield takeEvery(receiveUserMessage.toString(), handleSocketMessage);
  yield takeEvery(receiveTeamChatMessage.toString(), handleSocketMessage);
  yield takeEvery(types.GET_MESSAGES_REQUEST, getMessages);
}
