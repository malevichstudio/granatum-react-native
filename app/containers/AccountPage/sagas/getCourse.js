import { call, put } from 'redux-saga/effects';

import forbidPage from 'app/containers/App/sagas/forbidPage';
import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { GET_COURSE_FAILURE } from '../constants';
import { getCourseSuccess } from '../actions';

/**
 * Эта сага предполагается, что будет вызываться на при заходе не страницу курса.
 * Мы добавяем проверку доступа для пользователя и если она потребуется где-то
 * в другом месте, но необходимо будет использовать другую аналогичную сагу, либо
 * модифицировать эту
 * @param payload
 * @return {IterableIterator<CallEffect|PutEffect<{payload, type}>>}
 */
export default function* getCourse({ payload }) {
  const data = yield call(
    requestSaga,
    api.endpoints.coursesOne.get,
    GET_COURSE_FAILURE,
    {
      id: payload.id,
    },
    undefined,
    {
      withNotify: true,
    },
  );

  if (!data || data.error) {
    if (data?.status === 403) {
      yield forbidPage();
    }
    if (data?.status === 409) {
      yield forbidPage();
    }
    return;
  }

  yield put(getCourseSuccess({ payload: data }));
}
