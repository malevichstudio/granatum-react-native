import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from '../../../config';
import { GET_MESSAGES_FAILURE } from '../constants';
import { getMessagesSuccess } from '../actions';

export default function* getMessages({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.chatsMessages.get,
    GET_MESSAGES_FAILURE,
    {
      id: payload.chatId,
      query: {
        action: payload.direction,
        ...(payload.lastMessageId ? { last: payload.lastMessageId } : {}),
      },
    },
    meta,
  );

  if (data && data.error) {
    return;
  }

  yield put(
    getMessagesSuccess({
      payload: { data, ...payload },
      meta,
    }),
  );
}
