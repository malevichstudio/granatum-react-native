import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { addNotification } from 'app/containers/App/actions';
import { setAuthToken } from 'app/utils/storage';
import { signInViaSocialSuccess } from '../actions';
import { SIGN_IN_VIA_SOCIAL_FAILURE } from '../constants';
import { navigate } from 'app/utils/RootNavigation';
import loadUserData from 'app/containers/App/sagas/loadUserData';

const getEndpointByType = (provider) => {
  switch (provider) {
    case 'google':
      return api.endpoints.accountLoginGoogle.post;
    case 'fb':
      return api.endpoints.accountLoginFb.post;
    case 'vk':
      return api.endpoints.accountLoginVk.post;
    default:
      return '';
  }
};

export default function* signInViaSocial({ payload, meta }) {
  const data = yield call(
    requestSaga,
    getEndpointByType(payload.provider),
    SIGN_IN_VIA_SOCIAL_FAILURE,
    {
      body: {
        token: payload.token,
        invite: payload.invite,
        sessionId: payload.sessionId,
      },
    },
  );

  if (Array.isArray(data?.errors) && data.errors[0]?.payload?.id) {
    yield put(
      signInViaSocialSuccess({ payload: data.errors[0].payload, meta }),
    );
    return;
  }

  if (data?.error && data?.message) {
    yield put(
      addNotification({
        message: { id: data.message },
        type: 'error',
      }),
    );
    return;
  }

  // when something goes wrong
  if (!data || !data.token) {
    // TODO: do something
    return;
  }

  setAuthToken(data.token, 'accessToken');

  yield call(loadUserData);

  if (data?.courseId && payload?.sessionId) {
    navigate('Session', {
      sessionId: payload?.sessionId,
    });
  } else if (data?.courseId) {
    navigate('Course', {
      projectId: data?.projectId,
      courseId: data?.courseId,
    });
  }
}
