import { call, put } from 'redux-saga/effects';

import requestSaga from 'utils/api/requestSaga';
import { api } from 'config';
import { CREATE_PERSONAL_CHAT_FAILURE } from '../constants';
import { createPersonalChatSuccess } from '../actions';

export default function* createPersonalChat({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.sessionsChats.post,
    CREATE_PERSONAL_CHAT_FAILURE,
    {
      id: payload.sessionId,
      body: { targetId: payload.targetId },
    },
    meta,
  );

  if (data && data.error) {
    return;
  }

  yield put(createPersonalChatSuccess({ payload: data, meta }));
}
