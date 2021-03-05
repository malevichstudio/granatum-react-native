import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from '../../../config';
import { GET_COURSE_ACCESS_FAILURE } from '../constants';
import { getCourseAccessSuccess } from '../actions';

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
    // todo
    return;
  }

  yield put(getCourseAccessSuccess(data.projectId));
}
