import { call } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { ADD_LIKE_FAILURE } from '../constants';

export default function* addLike({ payload }) {
  yield call(
    requestSaga,
    api.endpoints.constructorStickerLike.post,
    ADD_LIKE_FAILURE,
    { id: payload },
    undefined,
    {
      withNotify: true,
    },
  );
}
