import { put, select } from 'redux-saga/effects';
import messages from '../messages';
import { navigate } from '../../../utils/RootNavigation';
import { addNotification } from '../../App/actions';

export default function* deleteCourseReceive(id) {
  const { courseId, projectId } = yield select(
    (state) => state.session.session,
  );
  if (courseId === id) {
    yield put(
      addNotification({
        message: messages.removeByAdmin,
        type: 'success',
      }),
    );
    navigate('Project', { projectId });
  }
}
