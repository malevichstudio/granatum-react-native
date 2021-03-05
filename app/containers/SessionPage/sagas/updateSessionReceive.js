import { put } from 'redux-saga/effects';

import { updateSessionReceive as updateSessionReceiveAction } from '../actions';

export default function* updateSessionReceive(payload) {
  yield put(updateSessionReceiveAction(payload));
}
