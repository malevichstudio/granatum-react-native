import { call } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { SIGN_IN_VIA_EMAIL_FAILURE } from '../../SignInPage/constants';
import { navigate } from 'app/utils/RootNavigation';

export default function* askPasswordResetLink({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountPassword.get,
    SIGN_IN_VIA_EMAIL_FAILURE,
    {
      query: {
        email: payload.email,
      },
    },
    meta,
    {
      withLoader: false,
    },
  );

  if (data && typeof data.error === 'string') {
    return;
  }

  navigate('RecoverySuccessPage');
}
