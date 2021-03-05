import { call, select } from 'redux-saga/effects';

import { api } from 'app/config';
import requestSaga from 'app/utils/api/requestSaga';
import {
  selectActiveSheetType,
  selectActiveSheetId,
  selectTeamId,
} from 'app/containers/SessionPage/selectors';

import { SORT_STICKER_BY_LIKE_FAILURE } from '../constants';
import { SHEET_TYPE_TEAM } from '../../../constants';

export default function* sortStickerByLike({ payload }) {
  const sheetType = yield select(selectActiveSheetType);
  const teamId = yield select(selectTeamId);
  const sheetId = yield select(selectActiveSheetId);

  yield call(
    requestSaga,
    api.endpoints.constructorWidgetsContent.get,
    SORT_STICKER_BY_LIKE_FAILURE,
    {
      id: payload.id,
      query: {
        sortByLikesCount: payload.sortByLikesCount,
        teamId: sheetType === SHEET_TYPE_TEAM ? teamId : null,
        sheetId,
      },
    },
  );
}
