import { takeEvery } from 'redux-saga/effects';

import updateAvatar from './updateAvatar';
import updateAccountInfo from './updateAccountInfo';
import updatePassword from './updatePassword';
import connectSocial from './connectSocial';
import deleteSocial from './deleteSocial';
import getAutocomplete from './getAutocomplete';
import {
  UPDATE_ACCOUNT_AVATAR_REQUEST,
  UPDATE_ACCOUNT_INFO_REQUEST,
  UPDATE_ACCOUNT_PASSWORD_REQUEST,
  CONNECT_ACCOUNT_SOCIAL_REQUEST,
  DELETE_ACCOUNT_SOCIAL_REQUEST,
  GET_AUTOCOMPLETE_REQUEST,
} from '../constants';

export default function* saga() {
  yield takeEvery(UPDATE_ACCOUNT_AVATAR_REQUEST, updateAvatar);
  yield takeEvery(UPDATE_ACCOUNT_INFO_REQUEST, updateAccountInfo);
  yield takeEvery(UPDATE_ACCOUNT_PASSWORD_REQUEST, updatePassword);
  yield takeEvery(CONNECT_ACCOUNT_SOCIAL_REQUEST, connectSocial);
  yield takeEvery(DELETE_ACCOUNT_SOCIAL_REQUEST, deleteSocial);
  yield takeEvery(GET_AUTOCOMPLETE_REQUEST, getAutocomplete);
}
