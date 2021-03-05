import { call, put } from 'redux-saga/effects';

import requestSaga from 'utils/api/requestSaga';
import { api } from 'config';
import { GET_PERSONAL_CHATS_FAILURE } from '../constants';
import { getPersonalChatsSuccess } from '../actions';

export default function* getPersonalChats({ payload }) {
  const data = yield call(
    requestSaga,
    api.endpoints.sessionsChatsPersonals.get,
    GET_PERSONAL_CHATS_FAILURE,
    {
      id: payload.sessionId,
    },
  );

  if (data && data.error) {
    return;
  }

  yield put(getPersonalChatsSuccess(data));
}
