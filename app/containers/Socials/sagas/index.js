import { takeLeading } from 'redux-saga/effects';

import signInViaSocial from './signInViaSocial';
import registrationOauth from './registrationOauth';
import {
  SIGN_IN_VIA_SOCIAL_REQUEST,
  REGISTRATION_OAUTH_REQUEST,
} from '../constants';

export default function* saga() {
  yield takeLeading(SIGN_IN_VIA_SOCIAL_REQUEST, signInViaSocial);
  yield takeLeading(REGISTRATION_OAUTH_REQUEST, registrationOauth);
}
