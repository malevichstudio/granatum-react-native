import { put, call, select, all, fork } from 'redux-saga/effects';

import {
  createProjectReceive,
  joinProjectReceive,
  leaveProjectReceive,
  updateProjectReceive,
  removeProjectReceive,
  createCourseReceive,
  updateCourseReceive,
  deleteCourseReceive,
  removeSessionReceive,
  updateSessionReceive,
  sessionNotificationsReceive,
  createSessionReceive as createSessionReceiveAction,
} from '../actions';
import updateCourseStatusReceive from './updateCourseStatusReceive';
import createSessionReceive from './createSessionReceive';
import refresh from './refresh';
import { addNotification } from '../../App/actions';
import messages from '../messages';
import { navigate } from '../../../utils/RootNavigation';

function* handleProjectMessages(payload) {
  switch (payload.event) {
    // пользователя добавили к проекту
    case 'join':
      yield put(joinProjectReceive(payload.value));
      break;
    // пользователя удалили из проекта
    case 'leave':
      yield put(leaveProjectReceive(payload.targetId));
      break;
    case 'created':
      yield put(createProjectReceive(payload.value));
      break;
    case 'updated':
      yield put(updateProjectReceive(payload.value));
      break;
    case 'deleted':
      yield put(removeProjectReceive(payload.targetId));
      break;
    default:
      break;
  }
}

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
        const { activeCourseId, activeProjectId } = yield select(
          (state) => state.projects,
        );
        yield put(deleteCourseReceive(payload.value.id));
        yield put(
          addNotification({
            message: messages.removeAccess,
            type: 'warning',
          }),
        );
        if (activeCourseId === payload.value.id) {
          navigate('Project', { projectId: activeProjectId });
        }
      }
      break;
    case 'join':
      yield put(createCourseReceive(payload.value));
      break;
    case 'created':
      yield put(createCourseReceive(payload.value));
      break;
    case 'updated':
      yield put(updateCourseReceive(payload.value));
      break;
    case 'deleted':
      yield put(deleteCourseReceive(payload.targetId));
      break;
    case 'session_notifications': {
      const { activeCourseId } = yield select((state) => state.projects);
      if (activeCourseId === payload.targetId) {
        yield put(sessionNotificationsReceive(payload.value));
      }
      break;
    }
    case 'session_start_notification':
      yield all(
        payload.value.map((item) => put(updateSessionReceive({ value: item }))),
      );
      break;
    default:
      break;
  }
}

function* handleSessionMessages(payload) {
  switch (payload.event) {
    case 'deleted':
      yield put(removeSessionReceive(payload.targetId));
      break;
    case 'updated':
      yield put(updateSessionReceive(payload.value));
      break;
    case 'created':
      yield fork(createSessionReceive, payload.value);
      break;
    case 'bulk_created': {
      const activeCourseId = yield select(
        (state) => state.projects.activeCourseId,
      );
      if (Array.isArray(payload.value) && payload.value.length) {
        for (let i = 0; i < payload.value.length; i += 1) {
          if (payload.value[i].courseId === activeCourseId) {
            yield put(createSessionReceiveAction(payload.value[i]));
          }
        }
      }
      break;
    }
    default:
      break;
  }
}

function* handleRefreshMessage(payload) {
  switch (payload.event) {
    case 'command':
      yield refresh(payload.targetId);
      break;

    default:
      break;
  }
}

export default function* handleSocketMessages({ payload }) {
  switch (payload.target) {
    case 'session':
      yield handleSessionMessages(payload);
      break;
    case 'project':
      yield handleProjectMessages(payload);
      break;
    case 'course status':
      yield handleCourseStatusMessages(payload);
      break;
    case 'course':
      yield handleCourseMessages(payload);
      break;
    case 'refresh':
      yield handleRefreshMessage(payload);
      break;
    default:
      break;
  }
}
