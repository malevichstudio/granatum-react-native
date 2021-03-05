import { put } from 'redux-saga/effects';

import { addNotification } from '../actions';
import messages from '../messages'
import { navigate } from 'app/utils/RootNavigation';

export default function* forbidPage() {
  yield put(
    addNotification({
      message: messages.accessDenied,
      type: 'error',
    }),
  );
  navigate('Projects');
}
