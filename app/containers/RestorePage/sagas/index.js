import { takeEvery } from 'redux-saga/effects';

import restorePassword from './restorePassword';
import checkToken from './checkToken';
import { RESTORE_PASSWORD_REQUEST, CHECK_TOKEN_REQUEST } from '../constants';

export default function* saga() {
  yield takeEvery(RESTORE_PASSWORD_REQUEST, restorePassword);
  yield takeEvery(CHECK_TOKEN_REQUEST, checkToken);
}
