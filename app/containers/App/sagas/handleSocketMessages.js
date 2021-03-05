import { put } from '@redux-saga/core/effects';
import leaveProjectReceive from './leaveProjectReceive';
import { addNotification } from '../actions';
import messages from '../messages';
import { navigate } from '../../../utils/RootNavigation';

function* handleProjectMessages(payload) {
  switch (payload.event) {
    // Пользователя удалили из проекта
    case 'leave':
      yield leaveProjectReceive(payload.value);
      break;
    case 'join':
      yield put(
        addNotification({
          message: {
            ...messages.addedToProject,
            values: { project: payload.value.name },
          },
          type: 'success',
        }),
      );
      break;
    default:
      break;
  }
}

function* handleUserMessages(payload) {
  switch (payload.event) {
    case 'invoked':
      yield put(
        addNotification({
          message: {
            ...messages.warnInvokeToSession,
            values: { name: payload.value },
          },
          type: 'warning',
        }),
      );
      break;
    case 'come_here':
      navigate('Session', {
        sessionId: payload.value.sessionId,
        sheetId: payload.value.sheetId,
      });
      break;
    default:
      break;
  }
}

export default function* handleSocketMessages({ payload }) {
  switch (payload.target) {
    case 'project':
      yield handleProjectMessages(payload);
      break;
    case 'user':
      yield handleUserMessages(payload);
      break;
    default:
      break;
  }
}
