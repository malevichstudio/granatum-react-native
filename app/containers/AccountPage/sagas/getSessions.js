import { call, put } from 'redux-saga/effects';

import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_SESSIONS_FAILURE } from '../constants';
import { getSessionsSuccess } from '../actions';

export default function* getSessions({ payload }) {
  const data = yield call(
    requestSaga,
    api.endpoints.coursesSessions.get,
    GET_SESSIONS_FAILURE,
    {
      id: payload.courseId,
    },
  );

  if (!data || data.error) {
    return;
  }

  yield put(getSessionsSuccess(data));
}
