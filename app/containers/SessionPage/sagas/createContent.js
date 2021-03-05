import { call, put } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { CREATE_USERS_CONTENT_FAILURE } from '../constants';
import { createContentSuccess } from '../actions';

export default function* createContent({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints.constructorContent.post,
    CREATE_USERS_CONTENT_FAILURE,
    {
      body: payload,
    },
    undefined,
    {
      withNotify: true,
    },
  );

  yield put(createContentSuccess(data, meta));
}
