import { all, put, select } from 'redux-saga/effects';

import {
  leaveTeams,
  updateSheetReceive,
  selectTeams,
  flushSelectedTeam,
} from '../actions';
import { selectActiveSheet, selectSelectedTeamIds } from '../selectors';
import selectTeamsInitially from './selectTeamsInitially';
import { SHEET_TYPE_COMMON } from '../../../constants';

/**
 * Эта сага нужна для случаев, когда кто-то из админов меняет тип текущего листа.
 * При этом текущему админу нужно переподключиться к первой команде набора, если
 * лист предполагает наличие команд
 * @param sheetId
 * @param type
 */
export default function* updateSheetTypeReceive(
  sheetId,
  { sheetType, teamsetId },
) {
  const activeSheet = yield select(selectActiveSheet);

  // Если активный лист -- не тот, который обновился
  if (activeSheet.id !== sheetId) {
    yield put(updateSheetReceive({ id: sheetId, type: sheetType, teamsetId }));
    return;
  }

  // Если тип листаменяется на общий, то мы обязательно должны очистить объект
  // с командой в сторе. На это у нас завязана логика в видео-панели по
  // переподключению к разным комнатам
  //
  // смотреть хук useInitBroadcasting
  if (sheetType === SHEET_TYPE_COMMON) {
    yield put(flushSelectedTeam());
  }

  // Это всё ещё лист с прошлым набором и командами и списком выбранных команд.
  // Мы вытаскиваем список для того, чтобы ОТПИСАТЬСЯ
  const prevSelectedTeamIds = yield select(selectSelectedTeamIds);

  if (Array.isArray(prevSelectedTeamIds) && prevSelectedTeamIds.length) {
    yield all([
      put(leaveTeams(prevSelectedTeamIds)),
      // чистим массив выбранных команд
      put(selectTeams([])),
    ]);
  }

  // теперь, после того, как мы отписались, пушим пришедшие изменения в лист,
  // чтобы ниже работать уже с новым листом
  yield put(updateSheetReceive({ id: sheetId, type: sheetType, teamsetId }));

  // если мы сменили тип на "общий", то id набора не будет, значит можно выходить
  if (typeof teamsetId !== 'string') {
    return;
  }

  yield selectTeamsInitially(teamsetId);
}
