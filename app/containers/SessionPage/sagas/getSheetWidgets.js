import { call, put, select } from 'redux-saga/effects';

import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';
// import { convertContentIfExist } from '../../../utils/editor';
import { getWidgetsSuccess } from '../actions';
import { GET_SHEET_WIDGETS_FAILURE } from '../constants';
import { selectActiveSheetId } from '../selectors';

/**
 * Fetch all available widgets for the active sheet
 * @return {IterableIterator<*>}
 */
export default function* getSheetWidgets() {
  const sheetId = yield select(selectActiveSheetId);

  const data = yield call(
    requestSaga,
    api.endpoints.constructorSheetsWidgets.get,
    GET_SHEET_WIDGETS_FAILURE,
    { id: sheetId },
  );

  if (data && typeof data.error !== 'string') {
    // for all text widgets we must convert their contentState into Immutable
    // object
    // const convertedData = data.map(convertContentIfExist);

    yield put(getWidgetsSuccess(data));
  }
}
