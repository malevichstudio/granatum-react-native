import { call, put, select } from 'redux-saga/effects';

import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_COURSES_FAILURE } from '../constants';
import { getCoursesSuccess } from '../actions';

export default function* getCourses({ payload, meta }) {
  const { filtersCourses } = yield select((state) => state.projects);

  const data = yield call(
    requestSaga,
    api.endpoints.projectsCourses.get,
    GET_COURSES_FAILURE,
    {
      id: payload.id,
      query: {
        ...(payload.filters || filtersCourses),
        ...(payload.page && { page: payload.page }),
      },
    },
  );

  if (!data || data.error) {
    return;
  }

  yield put(getCoursesSuccess({ payload: data, meta }));
}
