import { put } from 'redux-saga/effects';

import { updateFontPairsReceive as updateFontPairsReceiveAction } from '../actions';

export default function* updateFontPairReceive(payload) {
  yield put(updateFontPairsReceiveAction(payload));
}
