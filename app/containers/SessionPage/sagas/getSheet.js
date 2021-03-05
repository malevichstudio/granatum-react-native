import { call, put } from 'redux-saga/effects';

import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_SHEET_FAILURE } from '../constants';
import { getSheetSuccess } from '../actions';

export default function* getSheet(sheetId) {
  const data = yield call(
    requestSaga,
    api.endpoints.constructorSheetsOne.get,
    GET_SHEET_FAILURE,
    { id: sheetId },
    undefined,
    {
      // Мы специально добавляем возможность ждать пока этот запрос не вернёт
      // положительный результат, потому что бывает случай, когда в процессе
      // работы, что-то происходит и бек может быть временно недоступен. Вместе
      // с этим socket.io сервер тоже будет недоступен, и после того, как они
      // восстановятся, интерфейс обновится (из-за логики в обработке веб-сокетов)
      // тогда этот запрос может не вернуться. OPTIONS вернёт ошибку, потому что
      // web-socket сервер поднялся раньше чем REST-сервер
      // именно этот запрос один из первых, которые будет сделаны
      withRetry: true,
    },
  );

  if (!data || data.error) {
    return;
  }
  yield put(getSheetSuccess({ payload: data }));
}
