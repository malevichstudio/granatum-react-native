import { call, put } from 'redux-saga/effects';

import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_SESSION_FAILURE } from '../constants';
import { getSessionSuccess } from '../actions';
import getSheets from './getSheets';
import forbidPage from 'app/containers/App/sagas/forbidPage';

export default function* getSession({ sessionId, sheetId }) {
  const data = yield call(
    requestSaga,
    api.endpoints.sessionsOne.get,
    GET_SESSION_FAILURE,
    { id: sessionId },
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
      withNotify: true,
    },
  );

  if (!data || typeof data.error === 'string') {
    if (data?.status === 403 || data?.status === 404) {
      yield forbidPage();
    }
    return;
  }

  yield call(getSheets, { sessionId, sheetId });
  yield put(getSessionSuccess({ payload: data }));
}
