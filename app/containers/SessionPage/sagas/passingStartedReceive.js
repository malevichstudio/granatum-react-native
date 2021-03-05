import { put, select } from 'redux-saga/effects';

import {
  closeChannel,
  createOrUpdateChannel,
} from '../../../utils/api/actions';
import { getSheetChannel } from '../../../utils/api/channels';
import { selectActiveSheetId } from '../selectors';

/**
 * Эта сага нужна только для сбора статистики на беке. На фронте она никакой
 * смысловой нагрузки не несёт
 */
export default function* passingStartedReceive() {
  const sheetId = yield select(selectActiveSheetId);
  // Переподписываемся на канал листа
  yield put(closeChannel(getSheetChannel(sheetId)));
  yield put(createOrUpdateChannel(getSheetChannel(sheetId)));
}
