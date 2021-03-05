import { put, select } from 'redux-saga/effects';

import { COURSE_STATUS_DRAFT } from '../../../constants';
import { createCourseReceive, deleteCourseReceive } from '../actions';
import { selectActiveProjectId } from '../selectors';
import { navigate } from 'app/utils/RootNavigation';
import { addNotification } from 'app/containers/App/actions';
import messages from '../messages';

export default function* updateCourseStatusReceive(course) {
  const projectId = yield select(selectActiveProjectId);

  // только если это происходит в активном проекте
  if (projectId === course.projectId) {
    if (course.status === COURSE_STATUS_DRAFT) {
      yield put(deleteCourseReceive(course.id));
      yield put(
        addNotification({
          message: messages.courseToDraft,
          type: 'error',
        }),
      );
      navigate('Project', { projectId: projectId });
    } else {
      yield put(createCourseReceive(course));
    }
  }
}
