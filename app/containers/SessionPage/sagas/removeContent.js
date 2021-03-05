import { call } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { REMOVE_USERS_CONTENT_FAILURE } from '../constants';

export default function* removeContent({ contentId }) {
  yield call(
    requestSaga,
    api.endpoints.constructorContent.delete,
    REMOVE_USERS_CONTENT_FAILURE,
    { query: [contentId] },
    undefined,
    {
      withNotify: true,
    },
  );
}
