import { call, put } from 'redux-saga/effects';

import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';
import { setAuthToken } from '../../../utils/storage';
import { SET_PASSWORD_FAILURE } from '../constants';
import { navigate } from '../../../utils/RootNavigation';
import loadUserData from '../../App/sagas/loadUserData';
import { setOpenedByLink } from '../../App/actions';

export default function* setPassword({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountRegistrationComplete.post,
    SET_PASSWORD_FAILURE,
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

  setAuthToken(data.token, 'accessToken');
  yield call(loadUserData);
  yield put(setOpenedByLink(null));

  if (payload.courseId && payload.sessionId) {
    navigate('Session', {
      sessionId: payload.sessionId,
    });
  } else if (payload.courseId) {
    navigate('Course', {
      projectId: data?.projectId,
      courseId: data?.courseId,
    });
  } else {
    navigate('Projects');
  }
}
