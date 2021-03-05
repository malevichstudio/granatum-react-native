import { call, put, select } from 'redux-saga/effects';
import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_SESSIONS_FAILURE } from '../constants';
import { sortSessionReceive } from '../actions';

export default function* refresh(targetId) {
  const activeCourseId = yield select((state) => state.projects.activeCourseId);
  if (targetId === activeCourseId) {
    const data = yield call(
      requestSaga,
      api.endpoints.coursesSessions.get,
      GET_SESSIONS_FAILURE,
      {
        id: activeCourseId,
        query: { field: ['available', 'orderIndex'] },
      },
    );

    if (!data || data.error) {
      return;
    }

    yield put(sortSessionReceive(data));
  }
}
