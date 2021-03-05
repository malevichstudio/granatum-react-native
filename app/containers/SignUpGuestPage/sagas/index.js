import { takeLeading } from 'redux-saga/effects';

import signUpGuest from './signUpGuest';
import { SIGN_UP_GUEST_REQUEST } from '../constants';

export default function* saga() {
  yield takeLeading(SIGN_UP_GUEST_REQUEST, signUpGuest);
}
