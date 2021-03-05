import { takeEvery } from 'redux-saga/effects';

import askPasswordResetLink from './askPasswordResetLink';
import { ASK_PASSWORD_RESET_LINK } from '../constants';

export default function* saga() {
  yield takeEvery(ASK_PASSWORD_RESET_LINK, askPasswordResetLink);
}
