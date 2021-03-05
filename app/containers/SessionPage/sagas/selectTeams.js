import { all, call, put, select } from 'redux-saga/effects';

import { createOrUpdateChannel } from '../../../utils/api/actions';
import { getTeamInSheetChannel } from '../../../utils/api/channels';
import { flushContent } from '../actions';
import getSheetContent from './getSheetContent';

/**
 * Админ переключается между командами. Мы должны подписывать/отписывать его на
 * каналы команд
 * @param {string[]} ids
 * @param {boolean} skipRefetchContent - не перезазагружать контент листа
 */
export default function* selectTeams({ ids, skipRefetchContent }) {
  const sheetId = yield select((state) => state.session.activeSheetId);

  yield all(
    ids.map((id) =>
      put(createOrUpdateChannel(getTeamInSheetChannel(id, sheetId))),
    ),
  );

  // Не всегда нужно перезапрашивать контент новой команды. Допустим, этого не
  // нужно делать если админ только зашёл на лист, либо если он перераспределил
  // всех
  if (!skipRefetchContent) {
    yield put(flushContent());

    // Помимо подписки на канал новой команды, нам нужно получить весь её контент
    yield call(getSheetContent);
  }
}
