import { call, put } from 'redux-saga/effects';

import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { getTimersSuccess } from '../actions';
import { GET_TIMERS_FAILURE } from '../constants';

export default function* getTimers(sheetId) {
  const data = yield call(
    requestSaga,
    api.endpoints.constructorSheetsTimers.get,
    GET_TIMERS_FAILURE,
    { id: sheetId },
  );

  if (data && typeof data.error !== 'string') {
    yield put(getTimersSuccess(data));
  }
}
