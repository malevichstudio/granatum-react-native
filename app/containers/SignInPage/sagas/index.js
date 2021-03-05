import { takeLatest } from 'redux-saga/effects';

import signInViaEmail from './signInViaEmail';
import { SIGN_IN_VIA_EMAIL_REQUEST } from '../constants';

export default function* saga() {
  yield takeLatest(SIGN_IN_VIA_EMAIL_REQUEST, signInViaEmail);
}
