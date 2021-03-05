import { call, put } from 'redux-saga/effects';

import { addNotification } from 'app/containers/App/actions';
import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { CHECK_TOKEN_FAILURE } from '../constants';
import messages from '../messages';
import { navigate } from 'app/utils/RootNavigation';

export default function* checkToken({ payload }) {
  const data = yield call(
    requestSaga,
    api.endpoints.accountPasswordToken.post,
    CHECK_TOKEN_FAILURE,
    {
      query: payload,
    },
    undefined,
    {
      withLoader: false,
    },
  );

  if (data?.error) {
    yield put(
      addNotification({
        message: messages.invalidVerifyToken,
        type: 'error',
      }),
    );
    navigate('SignInPage');
  }
}
