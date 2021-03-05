import { takeEvery } from 'redux-saga/effects';

import signUpConfirm from './signUpConfirm';
import { SIGN_UP_CONFIRM_REQUEST } from '../constants';

export default function* saga() {
  yield takeEvery(SIGN_UP_CONFIRM_REQUEST, signUpConfirm);
}
