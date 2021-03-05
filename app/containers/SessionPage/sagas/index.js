import { takeEvery, takeLatest, takeLeading, fork } from 'redux-saga/effects';
import {
  receiveSessionMessage,
  receiveUserMessage,
} from '../../../utils/api/actions';

import enterSession from './enterSession';
import enterSheet from './enterSheet';
import leaveSheet from './leaveSheet';
import leaveTeams from './leaveTeams';
import selectTeams from './selectTeams';
import addLike from './addLike';
import updateContent from './updateContent';
import createContent from './createContent';
import sortStickerByLike from './sortStickerByLike';
import removeContent from './removeContent';
import moveContent from './moveContent';
import watchCreateContentReceive from './watchCreateContentReceive';
import watchUpdateContentReceive from './watchUpdateContentReceive';
import handleSocketMessages from './handleSocketMessages';
import handleSocketUserMessages from './handleSocketUserMessages';
import * as types from '../constants';

export default function* saga() {
  yield takeLeading(types.ENTER_SESSION, enterSession);

  yield takeEvery(types.LEAVE_TEAMS, leaveTeams);
  yield takeEvery(types.SELECT_TEAMS, selectTeams);
  yield takeEvery(receiveSessionMessage.toString(), handleSocketMessages);
  yield takeEvery(receiveUserMessage.toString(), handleSocketUserMessages);
  yield takeLatest(types.ENTER_SHEET, enterSheet);
  yield takeLatest(types.LEAVE_SHEET, leaveSheet);
  yield takeEvery(types.ADD_LIKE_REQUEST, addLike);
  yield takeLatest(
    [types.UPDATE_USERS_CONTENT_REQUEST, types.CHANGE_CONTENT_EDITED_REQUEST],
    updateContent,
  );
  yield takeLeading(types.CREATE_USERS_CONTENT_REQUEST, createContent);
  yield takeEvery(types.SORT_STICKER_BY_LIKE_REQUEST, sortStickerByLike);
  yield takeLeading(types.REMOVE_USERS_CONTENT_REQUEST, removeContent);
  yield takeEvery(types.MOVE_USERS_CONTENT_REQUEST, moveContent);
  yield fork(watchCreateContentReceive);
  yield fork(watchUpdateContentReceive);
}
