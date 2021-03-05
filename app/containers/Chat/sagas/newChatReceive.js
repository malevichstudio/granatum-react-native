import { put, select } from 'redux-saga/effects';

import { createOrUpdateChannel } from 'app/utils/api/actions';
import { getTeamChatChannel } from 'app/utils/api/channels';
import { SHEET_TYPE_TEAM } from '../../../constants';
import { createPersonalChatReceive } from '../actions';

export default function* newChatReceive(payload) {
  const userId = yield select((state) => state.user.id);
  if (userId !== payload.value.creatorId) {
    yield put(createPersonalChatReceive(payload.value));
    if (payload.value.type === SHEET_TYPE_TEAM) {
      yield put(
        createOrUpdateChannel(
          getTeamChatChannel(payload.value.teamId, payload.value.id),
        ),
      );
    }
  }
}
