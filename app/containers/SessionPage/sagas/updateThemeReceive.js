import { put } from 'redux-saga/effects';

import { updateThemeReceive as updateThemeReceiveAction } from '../actions';

export default function* updateThemeReceive(payload) {
  const { id, ...rest } = payload;

  yield put(updateThemeReceiveAction(id, rest));
}
