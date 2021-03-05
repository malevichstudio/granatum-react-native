import { call, put, select } from 'redux-saga/effects';
import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_PROJECTS_FAILURE } from '../constants';
import { getProjectsSuccess } from '../actions';

export default function* getProjects({ payload, meta }) {
  const { filtersProjects } = yield select((state) => state.projects);

  const data = yield call(
    requestSaga,
    api.endpoints.projects.get,
    GET_PROJECTS_FAILURE,
    {
      query: {
        ...(payload.name ? { name: payload.name } : filtersProjects),
        ...(payload.page && { page: payload.page }),
      },
    },
  );
  if (data?.error || !data) {
    return;
  }

  yield put(getProjectsSuccess({ payload: data, meta }));
}
