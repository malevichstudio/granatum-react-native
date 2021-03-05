import { call, put } from 'redux-saga/effects';

import forbidPage from 'app/containers/App/sagas/forbidPage';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { GET_COURSE_FAILURE } from '../constants';
import { getCourseSuccess } from '../actions';

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
    if (data.status === 403) {
      yield forbidPage();
    }
    // Происходит, если курс был удалён до перехода по инвайту
    else if (data.status === 404) {
      yield forbidPage();
    }

    return;
  }

  yield put(getCourseSuccess(data, meta));
}
