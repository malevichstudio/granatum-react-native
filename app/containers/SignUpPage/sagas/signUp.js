import { call, put } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { signUpSuccess } from '../actions';
import { SIGN_UP_VIA_EMAIL_FAILURE } from '../constants';

export default function* signUp({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountRegistration.post,
    SIGN_UP_VIA_EMAIL_FAILURE,
    {
      body: payload,
    },
    meta,
    {
      withLoader: false,
    },
  );

  if (data && typeof data.error === 'string') {
    return;
  }

  yield put(signUpSuccess({ meta }));
}
