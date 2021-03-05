import { put, select } from '@redux-saga/core/effects';
import { addNotification } from '../actions';
import messages from '../messages';
import { navigate } from '../../../utils/RootNavigation';

export default function* leaveProjectReceive(project) {
  yield put(
    addNotification({
      message: {
        ...messages.removedFromProject,
        values: { project: project.name },
      },
    }),
  );
  const session = yield select((state) => state.session?.session);
  const activeProjectId = yield select(
    (state) => state.projects?.activeProjectId,
  );
  // если пользователь находится в одной из сессий проекта, то нужно кикнуть его
  // на страницу проектов
  if (session?.projectId === project.id || activeProjectId === project.id) {
    navigate('Projects');
  }
}
