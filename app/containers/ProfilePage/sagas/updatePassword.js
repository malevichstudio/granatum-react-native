import { call, put } from 'redux-saga/effects';

import { addNotification } from 'app/containers/App/actions';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { updatePasswordSuccess } from '../actions';
import { UPDATE_ACCOUNT_PASSWORD_FAILURE } from '../constants';
import messages from '../messages';

export default function* updateAvatar({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountPassword.post,
    UPDATE_ACCOUNT_PASSWORD_FAILURE,
    {
      body: payload,
    },
    meta,
    {
      withLoader: false,
    },
  );

  if (data && data.errors) {
    return;
  }

  yield put(updatePasswordSuccess({ meta }));

  yield put(
    addNotification({
      message: messages.updatePasswordSuccess,
      type: 'success',
    }),
  );
}
