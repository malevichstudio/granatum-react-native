import { call, put, select } from 'redux-saga/effects';

import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';
import { getTeamsSetsSuccess } from '../actions';
import { GET_TEAMS_SETS_FAILURE } from '../constants';

export default function* getTeamsSets() {
  const sessionId = yield select((state) => state.session.session.id);

  const data = yield call(
    requestSaga,
    api.endpoints.teamsets.get,
    GET_TEAMS_SETS_FAILURE,
    { query: { sessionId } },
  );

  if (!data || typeof data.error === 'string') {
    return;
  }

  yield put(getTeamsSetsSuccess(data));
}
