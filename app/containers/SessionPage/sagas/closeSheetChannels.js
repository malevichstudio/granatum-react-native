import { put, select, all } from 'redux-saga/effects';

import { closeChannel } from '../../../utils/api/actions';
import { isSessionAdmin } from '../../../utils/permissions';
import {
  getSheetChannel,
  getTeamChatChannel,
  getTeamInSheetChannel,
  getUserInTeamSetChannel,
  getRoleInTargetChannel,
  getUserSheetChannel,
} from '../../../utils/api/channels';
import { SHEET_TYPE_TEAM } from '../../../constants';
import { selectActiveSheetType } from '../selectors';
import { clearTeamChats } from '../../Chat/actions';
import { selectTeamChats } from '../../Chat/selectors';

export default function* closeSheetChannels(sheetId) {
  // we are disconnecting from this sheets webSocket channel
  yield put(closeChannel(getSheetChannel(sheetId)));
  const selectedTeamIds = yield select(
    (state) => state.session.selectedTeamIds,
  );
  const role = yield select((state) => state.session.session.role);
  const sheetType = yield select(selectActiveSheetType);
  const userId = yield select((state) => state.user.id);
  const isAdmin = isSessionAdmin(role);

  yield put(
    closeChannel(getRoleInTargetChannel(sheetId, isAdmin ? undefined : 'user')),
  );
  yield put(closeChannel(getUserSheetChannel(userId, sheetId)));

  // этот массив заполнен только у админов
  if (selectedTeamIds.length) {
    yield all(
      selectedTeamIds.map((id) =>
        put(closeChannel(getTeamInSheetChannel(id, sheetId))),
      ),
    );
  } else {
    // Если пользователь состоит в команде, отписываемся от канала этой команды
    const team = yield select((state) => state.session.team);
    if (team && team.id) {
      yield put(closeChannel(getTeamInSheetChannel(team.id, sheetId)));

      // Отписываемся от канала набора
      yield put(closeChannel(getUserInTeamSetChannel(userId, team.teamSetId)));
    }
  }

  if (sheetType === SHEET_TYPE_TEAM) {
    // чаты всех команд на текущем листе. Админ подписан на все команды, а пользователь
    // только на одну, так что у них одинаковая логика, только количество элементов
    // в массиве разное
    const teamChats = yield select(selectTeamChats);
    yield all(
      teamChats.map((chat) =>
        put(closeChannel(getTeamChatChannel(chat.teamId, chat.id))),
      ),
    );
    // удаляем все командные чаты
    yield put(clearTeamChats());
  }
}
