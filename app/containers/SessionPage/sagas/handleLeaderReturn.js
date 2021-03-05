import { put, select } from 'redux-saga/effects';
import { removeNotification } from '../../App/actions';

/**
 * Обрабатываем событие возвращения ведущего на страницу. Нам нужно отключить
 * уведомление, которое мы выводили, когда ведущий отключился
 * @return {IterableIterator<*>}
 */
export default function* handleLeaderReturn() {
  const notifications = yield select((state) => state.app.notifications);

  if (!notifications.length) {
    return;
  }

  const notification = notifications.find(
    (n) => n.message.id === 'session.leaderDisconnected',
  );

  if (notification) {
    yield put(removeNotification(notification.id));
  }
}
