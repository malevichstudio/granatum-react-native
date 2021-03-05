import { takeEvery } from 'redux-saga/effects';

import setPassword from './setPassword';
import { SET_PASSWORD_REQUEST } from '../constants';

export default function* saga() {
  yield takeEvery(SET_PASSWORD_REQUEST, setPassword);
}
