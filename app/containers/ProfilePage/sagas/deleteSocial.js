import { call } from 'redux-saga/effects';

import loadUserData from 'app/containers/App/sagas/loadUserData';
import requestSaga from 'app/utils/api/requestSaga';
import { api, authProviders } from 'app/config';
import { DELETE_ACCOUNT_SOCIAL_FAILURE } from '../constants';

export default function* deleteSocial({ payload }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountUnbind.post,
    DELETE_ACCOUNT_SOCIAL_FAILURE,
    {
      body: {
        provider: authProviders[payload.provider].apiSlug,
      },
    },
    undefined,
    {
      withNotify: true,
    },
  );

  if (data && data.error) {
    return;
  }

  yield call(loadUserData);
}
