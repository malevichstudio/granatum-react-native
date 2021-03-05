import { call, put } from 'redux-saga/effects';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { setAuthToken } from 'app/utils/storage';
import { addNotification } from 'app/containers/App/actions';
import { restorePasswordSuccess } from '../actions';
import { RESTORE_PASSWORD_FAILURE } from '../constants';
import messages from '../messages';
import loadUserData from '../../App/sagas/loadUserData';

export default function* restorePassword({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountPasswordRestore.post,
    RESTORE_PASSWORD_FAILURE,
    {
      body: payload,
    },
    meta,
    {
      withLoader: false,
    },
  );

  // when something goes wrong
  if (!data || typeof data.token !== 'string') {
    // TODO: do something
    return;
  }

  setAuthToken(data.token, 'accessToken');

  yield put(restorePasswordSuccess({ meta }));

  yield put(
    addNotification({
      message: messages.restorePasswordSuccess,
      type: 'success',
    }),
  );

  yield call(loadUserData);
}
