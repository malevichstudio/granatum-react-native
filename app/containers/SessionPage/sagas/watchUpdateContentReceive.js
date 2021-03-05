import { actionChannel, call, take, put } from 'redux-saga/effects';

import { updateContentSuccess } from '../actions';
import { UPDATE_USERS_CONTENT_RECEIVE } from '../constants';

export default function* watchUpdateContentReceive() {
  // @see https://redux-saga.js.org/docs/advanced/Channels.html
  const chan = yield actionChannel(UPDATE_USERS_CONTENT_RECEIVE);

  while (true) {
    const { payload } = yield take(chan);
    yield call(handleUpdateContentReceive, payload);
  }
}

function* handleUpdateContentReceive(payload) {
  yield put(updateContentSuccess(payload));
}
