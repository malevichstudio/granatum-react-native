import { all, put, select } from 'redux-saga/effects';

import { selectCurrentTeamChat } from 'app/containers/Chat/selectors';
import { closeChannel } from 'app/utils/api/actions';
import {
  getTeamChatChannel,
  getTeamInSheetChannel,
} from 'app/utils/api/channels';
import { flushTeamRelatedBlocks } from '../actions';

export default function* leaveTeams({ ids }) {
  const sheetId = yield select((state) => state.session.activeSheetId);

  yield all(
    ids.map((id) => {
      if (id !== 'unassigned') {
        return put(closeChannel(getTeamInSheetChannel(id, sheetId)));
      }
      return null;
    }),
  );

  // Если пользователь не админ, очищаем все блоки вариантов, которые относились
  // к его команде

  if (Array.isArray(ids) && ids[0]) {
    yield put(flushTeamRelatedBlocks(ids[0]));

    // Помимо всего прочего в этом месте мы должны отписать обычного
    // пользователя от его командного чата. Админа мы отписываем в саге
    // `removeTeamReceive`
    const chat = yield select(selectCurrentTeamChat);
    if (chat) {
      // у пользователя только одна команда
      yield put(closeChannel(getTeamChatChannel(ids[0], chat.id)));
    }
  }
}
