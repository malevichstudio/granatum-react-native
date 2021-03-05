import { call } from 'redux-saga/effects';

import loadUserData from 'app/containers/App/sagas/loadUserData';
import requestSaga from 'app/utils/api/requestSaga';
import { api, authProviders } from 'app/config';
import { CONNECT_ACCOUNT_SOCIAL_FAILURE } from '../constants';

export default function* connectSocial({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountBind.post,
    CONNECT_ACCOUNT_SOCIAL_FAILURE,
    {
      body: {
        code: payload.token,
        provider: authProviders[payload.provider].apiSlug,
      },
    },
    meta,
    {
      withNotify: true,
    },
  );

  if (data && data.error) {
    return;
  }

  yield call(loadUserData);
}
