import { put, select } from 'redux-saga/effects';
import { COURSE_STATUS_DRAFT } from '../../../constants';
import { updateSessionReceive } from '../actions';
import messages from '../messages';
import { selectSession } from '../selectors';
import { navigate } from '../../../utils/RootNavigation';
import { addNotification } from '../../App/actions';

export default function* updateCourseStatusReceive(course) {
  const session = yield select(selectSession);

  // Если это не курс сессии, то ничего не делаем
  if (session.courseId === course.id) {
    if (course.status === COURSE_STATUS_DRAFT) {
      yield put(
        addNotification({
          message: messages.courseToDraft,
          type: 'error',
        }),
      );
      navigate('Project', { projectId: session.projectId });
    }
    yield put(updateSessionReceive({ courseStatus: course.status }));
  }
}
