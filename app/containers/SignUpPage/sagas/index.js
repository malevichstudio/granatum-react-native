import { takeEvery } from 'redux-saga/effects';

import signUp from './signUp';
import { SIGN_UP_VIA_EMAIL_REQUEST } from '../constants';

export default function* saga() {
  yield takeEvery(SIGN_UP_VIA_EMAIL_REQUEST, signUp);
}
