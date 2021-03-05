import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { GET_COURSE_ACCESS_FAILURE } from '../constants';
import { navigate } from 'app/utils/RootNavigation';
import { cleanTokens } from '../../../utils/storage';
import { signOutSuccess } from '../actions';
import { setOpenedByLink } from 'app/containers/App/actions';

export default function* getCourseAccess({ payload }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountCheckAccessCourse.get,
    GET_COURSE_ACCESS_FAILURE,
    {
      query: {
        token: payload.token,
      },
    },
    undefined,
    {
      withNotify: true,
    },
  );

  if (!data || data?.error) {
    yield call(cleanTokens);
    yield put(signOutSuccess());

    // todo
    return;
  }

  yield put(setOpenedByLink(null));

  if (data?.projectId) {
    if (payload?.courseId && payload?.sessionId) {
      navigate('Session', {
        sessionId: payload?.sessionId,
      });
    } else if (payload?.courseId) {
      navigate('Course', {
        projectId: data?.projectId,
        courseId: payload?.courseId,
      });
    } else {
      navigate('Projects');
    }
  }
}
