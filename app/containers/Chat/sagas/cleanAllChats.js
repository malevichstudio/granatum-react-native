import { call } from 'redux-saga/effects';

import requestSaga from 'utils/api/requestSaga';
import { api } from 'config';
import { CLEAN_ALL_CHATS_FAILURE } from '../constants';

export default function* cleanAllChats({ payload }) {
  yield call(
    requestSaga,
    api.endpoints.sessionsMessages.delete,
    CLEAN_ALL_CHATS_FAILURE,
    {
      id: payload.sessionId,
    },
  );
}
