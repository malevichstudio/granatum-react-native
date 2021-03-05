import { put } from 'redux-saga/effects';
import messages from '../messages';
import { addNotification } from '../../App/actions';

export default function* leaderDisconnected() {
  yield put(
    addNotification({
      message: messages.leaderDisconnected,
      type: 'warning',
      duration: 1000 * 30,
    }),
  );
}
