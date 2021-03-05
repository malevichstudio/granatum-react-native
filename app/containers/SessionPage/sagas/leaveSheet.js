import { put } from 'redux-saga/effects';

import { leaveSheetComplete } from '../actions';
import closeSheetChannels from './closeSheetChannels';

export default function* leaveSheet({ sheetId }) {
  // Когда мы только заходим в сессию, мы попадаем на роут с пустым sheetId
  // в этом случае нам не нужно ничего выполнять здесь
  if (!sheetId) {
    return;
  }

  // отписываемся от веб-сокет каналов листа и очищяем чаты
  yield closeSheetChannels(sheetId);

  // очищаем поля в сторе, связанные с листом
  yield put(leaveSheetComplete(sheetId));
}
