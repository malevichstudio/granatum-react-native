import { call, put } from 'redux-saga/effects';

import { setAuthToken } from 'app/utils/storage';
import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { REGISTRATION_OAUTH_FAILURE } from '../constants';
import { setOpenedByLink } from 'app/containers/App/actions';
import { navigate } from 'app/utils/RootNavigation';
import loadUserData from 'app/containers/App/sagas/loadUserData';

export default function* registrationOauth({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountRegistrationOauth.post,
    REGISTRATION_OAUTH_FAILURE,
    {
      body: payload,
    },
    meta,
  );

  // when something goes wrong
  if (!data || data.error) {
    // TODO: do something
    return;
  }

  setAuthToken(data.token, 'accessToken');

  yield call(loadUserData);
  yield put(setOpenedByLink(null));

  if (data?.courseId && payload?.sessionId) {
    navigate('Session', {
      sessionId: payload?.sessionId,
    });
  } else if (data?.courseId) {
    navigate('Course', {
      projectId: data?.projectId,
      courseId: data?.courseId,
    });
  } else {
    navigate('Projects');
  }
}
