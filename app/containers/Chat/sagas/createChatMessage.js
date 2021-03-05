import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from '../../../config';
import { CREATE_CHAT_MESSAGE_FAILURE } from '../constants';
import { createChatMessageSuccess } from '../actions';

export default function* createChatMessage({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.chatsMessages.post,
    CREATE_CHAT_MESSAGE_FAILURE,
    {
      id: payload.chatId,
      body: { text: payload.text },
    },
    meta,
  );

  if (data && data.error) {
    return;
  }

  yield put(createChatMessageSuccess({ payload: data, meta }));
}
