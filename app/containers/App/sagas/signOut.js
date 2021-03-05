import { call, put, select } from 'redux-saga/effects';
import { cleanTokens } from '../../../utils/storage';
import { closeChannel, closeConnect } from '../../../utils/api/actions';
import { getUserChannel } from '../../../utils/api/channels';
import { signOutSuccess } from '../actions';

export default function* signOut() {
  yield call(cleanTokens);
  const user = yield select((state) => state.user);
  yield put(closeChannel(getUserChannel(user.id)));
  yield put(closeConnect());
  yield put(signOutSuccess());
}
