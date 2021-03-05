import { call, put, select, all } from 'redux-saga/effects';

import { selectActiveSheetType } from 'app/containers/SessionPage/selectors';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from '../../../config';
import { createOrUpdateChannel } from 'app/utils/api/actions';
import { getTeamChatChannel } from 'app/utils/api/channels';
import { SHEET_TYPE_TEAM } from '../../../constants';
import { getChatsSuccess } from '../actions';
import { GET_CHATS_FAILURE } from '../constants';

export default function* getChats({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.chats.post,
    GET_CHATS_FAILURE,
    {
      body: payload,
    },
    meta,
  );

  if (!data || data.error) {
    return;
  }

  yield put(getChatsSuccess({ payload: data, meta }));

  const sheetType = yield select(selectActiveSheetType);

  if (sheetType === SHEET_TYPE_TEAM) {
    yield all(
      data.map(({ id, type, teamId }) => {
        if (type === SHEET_TYPE_TEAM) {
          return put(createOrUpdateChannel(getTeamChatChannel(teamId, id)));
        }
        return null;
      }),
    );
  }
}
