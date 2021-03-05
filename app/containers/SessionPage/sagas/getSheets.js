import { call, put, select } from 'redux-saga/effects';

import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { getSheetsSuccess } from '../actions';
import { GET_SHEETS_FAILURE } from '../constants';
import { navigate } from '../../../utils/RootNavigation';

export default function* getSheets({ sessionId, sheetId }) {
  const data = yield call(
    requestSaga,
    api.endpoints.constructorSessionsSheets.get,
    GET_SHEETS_FAILURE,
    { id: sessionId },
  );

  if (!data || typeof data.error === 'string') {
    return;
  }

  yield put(getSheetsSuccess({ payload: data }));

  const { activeSheetId } = yield select((state) => state.session);

  if (!activeSheetId && data?.length) {
    navigate('Session', { sessionId, sheetId: sheetId || data[0].id });
  }
}
