import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
import signOut from './signOut';
import handleSocketMessages from './handleSocketMessages';
import updateUser from './updateUser';
import {
  SIGN_OUT_REQUEST,
  LOAD_USER_DATA_SUCCESS,
  GET_COURSE_ACCESS_REQUEST,
  CHANGE_LANG,
} from '../constants';
import ENV from '../../../../env';
import { SocketApi } from '../../../utils/api/socket';
import {
  createOrUpdateChannel,
  closeChannel,
  receiveUserMessage,
  closeConnect,
} from '../../../utils/api/actions';
import getCourseAccess from './getCourseAccess';

const wsUrl = `${ENV.WS_API_HOST}:${ENV.WS_API_PORT}`;
let socketApi = null;

export default function* saga() {
  socketApi = new SocketApi({ url: wsUrl });

  yield takeLeading(LOAD_USER_DATA_SUCCESS, socketApi.connect);
  yield takeEvery(createOrUpdateChannel.toString(), socketApi.createChannel);
  // we must listen every `close channel` action
  yield takeEvery(closeChannel.toString(), socketApi.closeChannel);
  yield takeEvery(closeConnect.toString(), socketApi.closeConnect);
  yield takeEvery(receiveUserMessage.toString(), handleSocketMessages);
  yield takeEvery(GET_COURSE_ACCESS_REQUEST, getCourseAccess);
  yield takeLatest(SIGN_OUT_REQUEST, signOut);
  yield takeLatest(CHANGE_LANG, updateUser);
}

export { socketApi };
