import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { setAuthToken } from 'app/utils/storage';
import { SIGN_UP_CONFIRM_FAILURE } from '../constants';
import { navigate } from 'app/utils/RootNavigation';
import loadUserData from 'app/containers/App/sagas/loadUserData';
import { addNotification } from 'app/containers/App/actions';
import messages from '../messages';

export default function* signUpConfirm({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountEmailConfirm.get,
    SIGN_UP_CONFIRM_FAILURE,
    {
      query: {
        token: payload.token,
      },
    },
    meta,
    {
      withNotify: true,
    },
  );

  if (!data?.error) {
    setAuthToken(data.token, 'accessToken');

    yield call(loadUserData);

    yield put(
      addNotification({
        message: messages.registrationConfirmed,
        type: 'success',
      }),
    );

    if (payload?.courseId && payload?.sessionId) {
      navigate('Session', {
        sessionId: payload?.sessionId,
      });
    } else if (payload?.courseId) {
      navigate('Course', {
        projectId: payload?.projectId,
        courseId: payload?.courseId,
      });
    }
  } else {
    navigate('SignInPage');
  }
}
