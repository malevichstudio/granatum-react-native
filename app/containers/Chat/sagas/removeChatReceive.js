import { put, select } from 'redux-saga/effects';

import { closeChannel } from 'app/utils/api/actions';
import { getTeamChatChannel } from 'app/utils/api/channels';
import { removeChatReceive as removeChatReceiveAction } from '../actions';
import { makeSelectChat } from '../selectors';

/**
 * Когда какой-то из админов удаляет команду, то все админы и пользователи
 * команды должны отписаться от чата этой команды
 * @param chatId
 */
export default function* removeChatReceive({ id, type }) {
  const chat = yield select(makeSelectChat(id, type));

  yield put(removeChatReceiveAction({ id, type }));

  if (!chat || typeof chat.teamId !== 'string') {
    return;
  }

  // Если это командный чат -- отписываесмся
  yield put(closeChannel(getTeamChatChannel(chat.teamId, id)));
}
