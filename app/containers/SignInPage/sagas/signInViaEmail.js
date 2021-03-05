import { call, put } from 'redux-saga/effects';
import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { SIGN_IN_VIA_EMAIL_FAILURE } from '../constants';
import { setAuthToken } from '../../../utils/storage';
import { signInViaEmailSuccess } from '../actions';
import loadUserData from '../../App/sagas/loadUserData';
import { navigate } from 'app/utils/RootNavigation';

export default function* signInViaEmail({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountLogin.post,
    SIGN_IN_VIA_EMAIL_FAILURE,
    {
      body: payload,
    },
    meta,
    {
      withLoader: false,
    },
  );

  if (!data || !data.token) {
    // TODO: show notify
    return;
  }

  if (data.verifyToken) {
    navigate('SignUpFinishingPage', {
      token: data.verifyToken,
      projectId: data?.projectId,
      courseId: data?.courseId,
      sessionId: payload.sessionId,
    });
    yield put(signInViaEmailSuccess({ meta }));
    return;
  }

  setAuthToken(data.token, 'accessToken');

  yield call(loadUserData);
  yield put(signInViaEmailSuccess({ meta }));
}
