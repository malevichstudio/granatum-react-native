import { call, put, select } from 'redux-saga/effects';

import { createOrUpdateChannel } from '../../../utils/api/actions';
import { getTeamInSheetChannel } from '../../../utils/api/channels';
import { updateTeamReceive } from '../actions';
import { selectActiveSheetId } from '../selectors';
import getSheetContent from './getSheetContent';
import getSheetWidgets from './getSheetWidgets';
import getBlocks from './getBlocks';
// import forceUpdateBlockLayout from './forceUpdateBlockLayout';

/**
 * Нам пришла информация, что юзера добавили в команду. В ответ мы должны
 * подключиться к каналу команды и добавить её себе в стор
 * @param team
 */
export default function* joinTeam(team) {
  const sheetId = yield select(selectActiveSheetId);
  if (team.id !== 'unassigned') {
    yield put(createOrUpdateChannel(getTeamInSheetChannel(team.id, sheetId)));
  }
  yield put(updateTeamReceive(team));

  // Скачиваем контент новой команды
  yield call(getSheetWidgets);
  yield call(getBlocks);
  // после рефакторинга работы с лейаутом в "Вариантах" у нас теперь иногда
  // не успевает отработать `document.getElementsByClassName()`, поэтому мы
  // добавляем небольшую, символическую задержку перед тем как будем рендерить
  // контент (стикеры)
  if (team.id !== 'unassigned') {
    yield call(getSheetContent);
  }
  // После того, как все виджеты/контент загружены, мы даём сигнал resizeObserver'у
  // о том, что можно попытаться ещё раз пересмотреть список элементов и обновиться
  // если есть что обновлять
  // yield fork(forceUpdateBlockLayout);
}
