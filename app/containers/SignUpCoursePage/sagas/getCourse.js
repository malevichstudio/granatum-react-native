import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from '../../../config';
import { GET_COURSE_FAILURE } from '../constants';
import { getCourseSuccess } from '../actions';
import { navigate } from 'app/utils/RootNavigation';

export default function* getCourse({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.publicCoursesOne.get,
    GET_COURSE_FAILURE,
    {
      id: payload.courseId,
    },
    undefined,
    {
      withNotify: true,
    },
  );

  if (!data || data.error) {
    navigate('SignInPage');
    return;
  }

  yield put(getCourseSuccess(data, meta));
}
