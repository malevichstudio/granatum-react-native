import { put, select } from 'redux-saga/effects';

import { addNotification } from '../../App/actions';
import messages from '../messages';
import { navigate } from '../../../utils/RootNavigation';

export default function* removeSessionReceive() {
  const session = yield select((state) => state.session.session);

  yield put(
    addNotification({
      message: messages.sessionHasBeenRemoved,
      type: 'warning',
    }),
  );
  navigate('Course', {
    projectId: session.projectId,
    courseId: session.courseId,
  });
}
