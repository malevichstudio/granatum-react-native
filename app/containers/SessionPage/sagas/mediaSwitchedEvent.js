import { call, select } from 'redux-saga/effects';

import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';

import { MEDIA_SWITCHED_EVENT_FAILURE } from '../constants';

export default function* mediaSwitchedEvent() {
  const id = yield select((state) => state.session.session.id);
  yield call(
    requestSaga,
    api.endpoints.sessionsDevice.post,
    MEDIA_SWITCHED_EVENT_FAILURE,
    { id },
  );
}
