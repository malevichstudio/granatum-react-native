import { call, put, select } from 'redux-saga/effects';

import { closeChannel } from '../../../utils/api/actions';
import { getCourseChannel } from '../../../utils/api/channels';
import enterSession from './enterSession';

/**
 * Обработка события начала сессии
 * @param payload
 */
export default function* sessionStartedReceive(payload) {
  const session = yield select((state) => state.session.session);

  // Если это админ, то он просто обновляет поля сессии
  // если это пользователь, то его нужно отписать от канала курса
  yield put(closeChannel(getCourseChannel(session.courseId)));
  // и заново выполнить сагу enterSession
  yield call(enterSession, { sessionId: session.id });
}
