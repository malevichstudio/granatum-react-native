import { call, put, select, spawn } from 'redux-saga/effects';

import { addNotification } from '../../App/actions';
import messages from '../messages';
import updateCourseStatusReceive from './updateCourseStatusReceive';
import removeProjectReceive from './removeProjectReceive';
import { navigate } from '../../../utils/RootNavigation';

function* handleCourseStatusMessages(payload) {
  switch (payload.event) {
    case 'updated':
      yield call(updateCourseStatusReceive, payload.value);
      break;
    default:
      break;
  }
}

function* handleCourseMessages(payload) {
  switch (payload.event) {
    case 'leave':
      {
        const { courseId, projectId } = yield select(
          (state) => state.session.session,
        );
        if (courseId === payload.value.id) {
          yield put(
            addNotification({
              message: messages.removeAccess,
              type: 'warning',
            }),
          );
          navigate('Project', { projectId });
        }
      }
      break;
    default:
      break;
  }
}

function* handleProjectMessages(payload) {
  switch (payload.event) {
    case 'deleted':
      yield spawn(removeProjectReceive, payload.targetId);
      break;
    default:
      break;
  }
}

export default function* handleSocketMessages({ payload }) {
  switch (payload.target) {
    case 'course':
      yield handleCourseMessages(payload);
      break;
    case 'course status':
      yield handleCourseStatusMessages(payload);
      break;
    case 'project':
      yield call(handleProjectMessages, payload);
      break;
    default:
      break;
  }
}
