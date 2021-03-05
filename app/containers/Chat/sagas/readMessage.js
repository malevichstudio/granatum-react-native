import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from '../../../config';
import { readMessageSuccess } from '../actions';
import { READ_CHAT_MESSAGE_FAILURE } from '../constants';

export default function* readMessage({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.messagesRead.post,
    READ_CHAT_MESSAGE_FAILURE,
    {
      id: payload.id,
    },
    meta,
  );

  if (data && data.error) {
    return;
  }

  yield put(
    readMessageSuccess({
      payload: {
        id: payload.id,
        existNewMessages: data.existNewMessages,
        chatId: payload.chatId,
        chatType: data.chatType,
      },
      meta,
    }),
  );
}
