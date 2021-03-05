import { call } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { UPDATE_USERS_CONTENT_FAILURE } from '../constants';

export default function* updateContent({ contentId, payload }) {
  yield call(
    requestSaga,
    api.endpoints.constructorContent.patch,
    UPDATE_USERS_CONTENT_FAILURE,
    {
      contentId,
      ...payload,
    },
    undefined,
    {
      withLoader: false,
      withNotify: true,
    },
  );
}
