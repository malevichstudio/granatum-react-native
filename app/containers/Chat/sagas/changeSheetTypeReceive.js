import { put, select } from 'redux-saga/effects';

import {
  selectActiveSheetId,
  selectActiveSheetType,
  selectTeamId,
} from 'app/containers/SessionPage/selectors';
import { SHEET_TYPE_TEAM } from '../../../constants';
import { clearTeamChat } from '../actions';

/**
 * Эта сага нужна только для пользователей. У админа она тоже будет выполняться,
 * но нам не важно, что она не удалит все командные чаты
 * @param sheetId
 */
export default function* changeSheetTypeReceive(sheetId) {
  const activeSheetId = yield select(selectActiveSheetId);
  // Если поменяли не наш лист, можно ничего не делать
  if (activeSheetId !== sheetId) {
    return;
  }

  const activeSheetType = yield select(selectActiveSheetType);
  // Если текущий тип листа не командный, то нас это не интересует в данном случае
  if (activeSheetType !== SHEET_TYPE_TEAM) {
    return;
  }

  const teamId = yield select(selectTeamId);
  if (typeof teamId === 'string') {
    yield put(clearTeamChat(teamId));
  }
}
