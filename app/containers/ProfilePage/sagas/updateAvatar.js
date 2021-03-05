import { call, put } from 'redux-saga/effects';

import {
  addNotification,
  loadUserDataSuccess,
} from 'app/containers/App/actions';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { updateAvatarSuccess } from '../actions';
import { UPDATE_ACCOUNT_AVATAR_FAILURE } from '../constants';
import messages from '../messages';

export default function* updateAvatar({ payload, meta }) {
  let data;
  if ('avatar' in payload) {
    data = yield call(
      requestSaga,
      api.endpoints.account.patch,
      UPDATE_ACCOUNT_AVATAR_FAILURE,
      payload,
      meta,
    );
  } else {
    data = yield call(
      requestSaga,
      api.endpoints.accountAvatar.post,
      UPDATE_ACCOUNT_AVATAR_FAILURE,
      {
        body: payload,
        isJson: false,
      },
      meta,
    );
  }

  if (data.errors) {
    return;
  }

  yield put(updateAvatarSuccess({ payalod: data, meta }));

  yield put(loadUserDataSuccess(data));

  yield put(
    addNotification({
      message: messages.avatarUploadSuccess,
      type: 'success',
    }),
  );
}
