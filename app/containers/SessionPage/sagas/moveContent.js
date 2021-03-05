import { call } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import { MOVE_USERS_CONTENT_FAILURE } from '../constants';

export default function* moveContent({ contentId, widgetId, blockId }) {
  yield call(
    requestSaga,
    api.endpoints.constructorContent.put,
    MOVE_USERS_CONTENT_FAILURE,
    { contentId, containerId: widgetId, blockId },
    undefined,
    {
      withNotify: true,
    },
  );
}
