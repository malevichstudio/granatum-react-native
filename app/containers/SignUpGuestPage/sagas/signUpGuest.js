import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { setAuthToken } from 'app/utils/storage';
import loadUserData from 'app/containers/App/sagas/loadUserData';
import { SIGN_UP_GUEST_FAILURE } from '../constants';
import { signUpGuestSuccess } from '../actions';

export default function* signUpGuest({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.guestAccount.post,
    SIGN_UP_GUEST_FAILURE,
    { body: payload },
    meta,
    {
      withLoader: false,
    },
  );

  if (typeof data?.error === 'string') {
    return;
  }

  if (data?.token) {
    setAuthToken(data.token, 'accessToken');
  }

  yield call(loadUserData);
  yield put(signUpGuestSuccess({ meta }));
}
