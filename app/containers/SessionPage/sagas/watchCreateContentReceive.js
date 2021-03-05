import { channel } from 'redux-saga';
import { call, take, fork, put } from 'redux-saga/effects';

import { createContentSuccess } from '../actions';
import { CREATE_USERS_CONTENT_RECEIVE } from '../constants';

export default function* watchCreateContentReceive() {
  // @see https://redux-saga.js.org/docs/advanced/Channels.html
  // create a channel to queue incoming requests
  const chan = yield call(channel);

  // create 3 worker 'threads'
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    yield fork(handleCreateContentReceive, chan);
  }

  while (true) {
    const { payload } = yield take(CREATE_USERS_CONTENT_RECEIVE);
    yield put(chan, payload);
  }
}

function* handleCreateContentReceive(chan) {
  while (true) {
    const payload = yield take(chan);
    yield put(createContentSuccess(payload));
  }
}
