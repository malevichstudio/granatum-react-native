import { all, put, select } from 'redux-saga/effects';

import { closeChannel } from '../../../utils/api/actions';
import { getTeamInSheetChannel } from '../../../utils/api/channels';
import {
  selectChatsWithTeam,
  selectTeams,
  removeTeamReceive as removeTeamReceiveAction,
} from '../actions';
import {
  selectSelectedChatsTeamId,
  selectActiveSheetTeams,
  selectSelectedTeamIds,
  selectActiveSheetId,
} from '../selectors';

/**
 * Обрабатываем удаление команд(ы)
 * @param {string[]} teams - список id удалённых команд
 * @param {string} teamsetId - id набора из которого удаляются команды
 * @param {'delete' | 'redistribute'} reason - причина удаления
 */
export default function* removeTeamReceive({
  teams,
  teamsetId /* , reason */,
}) {
  // получаем текущую выбранную команду до удаления, иначе мы можем уже её не
  // увидеть
  const selectedChatTeamId = yield select(selectSelectedChatsTeamId);
  const selectedTeamIds = yield select(selectSelectedTeamIds);

  yield all(
    teams.map((teamId) => put(removeTeamReceiveAction(teamId, teamsetId))),
  );

  const remainingTeams = yield select(selectActiveSheetTeams);

  if (teams.includes(selectedChatTeamId)) {
    if (Array.isArray(remainingTeams) && remainingTeams.length) {
      // делаем первую же команду выбранной
      yield put(selectChatsWithTeam(remainingTeams[0].id));
    }
  }

  // если в самой сессии выбрана одна из удалённых команд, то нужно её переключить
  if (teams.some((teamId) => selectedTeamIds.includes(teamId))) {
    if (selectedTeamIds.length === 1) {
      if (Array.isArray(remainingTeams) && remainingTeams.length) {
        yield put(selectTeams([remainingTeams[0].id]));
      }
    }

    const sheetId = yield select(selectActiveSheetId);

    // и в завершении нужно отписаться от этих команд
    // от чатов команд мы отписываемся в другой саге:
    // app/containers/Chat/sagas/removeChatReceive.js
    yield all(
      teams.map((teamId) =>
        put(closeChannel(getTeamInSheetChannel(teamId, sheetId))),
      ),
    );
  }
}
