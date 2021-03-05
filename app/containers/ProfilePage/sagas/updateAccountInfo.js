import { call, put } from 'redux-saga/effects';

import {
  loadUserDataSuccess,
  addNotification,
} from 'app/containers/App/actions';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { UPDATE_ACCOUNT_INFO_FAILURE } from '../constants';
import messages from '../messages';
import { updateAccountInfoSuccess } from '../actions';

export default function* updateAccountInfo({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.account.patch,
    UPDATE_ACCOUNT_INFO_FAILURE,
    payload,
    meta,
    {
      withLoader: false,
    },
  );

  if (data.errors) {
    return;
  }

  yield put(loadUserDataSuccess(data));
  yield put(updateAccountInfoSuccess({ meta }));
  yield put(
    addNotification({
      message: messages.updateAccountInfoSuccess,
      type: 'success',
    }),
  );
}
