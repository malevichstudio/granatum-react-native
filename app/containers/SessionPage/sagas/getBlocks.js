import { call, put, select } from 'redux-saga/effects';

import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';
import { getBlocksSuccess } from '../actions';
import { GET_BLOCKS_FAILURE } from '../constants';
import {
  selectActiveSheetId,
  selectActiveBreakpoint,
} from '../selectors';
import { layoutCorrect } from '../../../utils/blocks/blocks';
/**
 * Fetch all available blocks for active sheet
 * @return {IterableIterator<*>}
 */
export default function* getBlocks() {
  const sheetId = yield select(selectActiveSheetId);

  const data = yield call(
    requestSaga,
    api.endpoints.constructorSheetsBlocks.get,
    GET_BLOCKS_FAILURE,
    { id: sheetId },
  );

  if (typeof data?.error !== 'string') {
    const activeBreakpoint = yield select(selectActiveBreakpoint);
    const correctedBlocks = data.map((block) => {
      if (block.layout) {
        block.layout[activeBreakpoint] = layoutCorrect(
          block.layout[activeBreakpoint],
          activeBreakpoint,
        );
      }
      return block;
    });
    yield put(getBlocksSuccess(correctedBlocks));
  }
}
