import { put, select } from 'redux-saga/effects';
import { changeDrawingReceive } from '../actions';

/**
 * Изменение линии в рисовалке по сокету.
 *
 * Добавляем только то, что нарисовал НЕ автор
 *
 */

export default function* changeDrawingReceiveWithoutUserId(id, payload) {
  const userId = yield select((state) => state.user.id);
  // не нужно добавлять линии для автора в стор, т.к они добавляются сразу
  if (userId !== payload.authorId) {
    yield put(changeDrawingReceive(id, payload));
  }
}
