import { put, select, all } from 'redux-saga/effects';

import { selectTeamChats } from 'app/containers/Chat/selectors';
import { closeChannel, createOrUpdateChannel } from 'app/utils/api/actions';
import { isSessionAdmin } from 'app/utils/permissions';
import {
  getTeamChatChannel,
  getTeamInSheetChannel,
  getUserInTeamSetChannel,
} from 'app/utils/api/channels';
import {
  updateSheetReceive,
  leaveTeams,
  selectTeams,
  changeAllTeamsSelection,
} from '../actions';
import { selectActiveSheet, selectSelectedTeamIds } from '../selectors';
import selectTeamsInitially from './selectTeamsInitially';

/**
 * На отвязку набора от листа мы, главным образом, должны отписать админа
 * от всех команд, на которые он был подписан в рамках этого набора
 *
 * @since 2.15 Теперь мы должны также отписаться пользователем от старого набора
 * и подписаться на новый, либо если поменялся тип листа, то либо отписаться,
 * либо подписаться
 *
 * Сага по логике очень похожа на `updateSheetTypeReceive`
 */
export default function* updateSheetTeamsSetReceive({ id, teamsetId }) {
  const activeSheet = yield select(selectActiveSheet);

  // Если обновлён не наш активный лист
  if (activeSheet.id !== id) {
    // обновляемся и выходим
    yield put(updateSheetReceive({ id, teamsetId }));
    return;
  }
  const role = yield select((state) => state.session.session.role);
  if (!isSessionAdmin(role)) {
    const userId = yield select((state) => state.user.id);
    // Смотрим, были ли у листа набор до этого и если был, то отписываемся от
    // предыдущего набора
    if (typeof activeSheet.teamsetId === 'string') {
      yield put(
        closeChannel(getUserInTeamSetChannel(userId, activeSheet.teamsetId)),
      );

      // Так же пользователя нужно оптисать от командных каналов
      const team = yield select((state) => state.session.team);
      if (team && team.id) {
        yield put(closeChannel(getTeamInSheetChannel(team.id, activeSheet.id)));

        const teamChats = yield select(selectTeamChats);

        if (Array.isArray(teamChats) && teamChats.length) {
          // отписываем пользователя от его командного чата
          yield put(
            closeChannel(
              getTeamChatChannel(teamChats[0].teamId, teamChats[0].id),
            ),
          );
        }
      }
    }

    // Если пришёл новый набор, подписываем пользователя на него
    if (typeof teamsetId === 'string') {
      yield put(
        createOrUpdateChannel(getUserInTeamSetChannel(userId, teamsetId)),
      );
    }

    yield put(updateSheetReceive({ id, teamsetId }));
    return;
  }

  const selectedTeamIds = yield select(selectSelectedTeamIds);

  // и главное -- нам нужно отписать админа от всех команд, на которые он был
  // подписан
  if (Array.isArray(selectedTeamIds) && selectedTeamIds.length) {
    yield all([
      put(leaveTeams(selectedTeamIds)),
      // чистим массив выбранных команд
      put(selectTeams([])),
      // скидываем эту настойку, чтобы выбирались все команды
      put(changeAllTeamsSelection(true)),
    ]);
  }

  // теперь, после того, как мы отписались, пушим пришедшие изменения в лист
  yield put(updateSheetReceive({ id, teamsetId }));

  // Если лист меняется на общий, то id набора будет null
  if (typeof teamsetId === 'string') {
    yield selectTeamsInitially(teamsetId);
  }
}
