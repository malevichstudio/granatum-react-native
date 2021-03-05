import { put, select } from 'redux-saga/effects';
import messages from '../messages';
import { removeSheetReceive as removeSheetReceiveAction } from '../actions';
import {
  selectActiveSheetId,
  selectActiveSheetIndex,
  selectSheets,
  selectSession,
  makeSelectSheet,
} from '../selectors';
import { addNotification } from '../../App/actions';
import { navigate } from '../../../utils/RootNavigation';

export default function* removeSheetReceive(sheetId) {
  const sheet = yield select(makeSelectSheet(sheetId));
  const activeSheetId = yield select(selectActiveSheetId);

  if (activeSheetId === sheetId) {
    yield put(
      addNotification({
        message: {
          ...messages.adminHasRemovedThePage,
          values: {
            title: sheet.title,
          },
        },
        type: 'success',
      }),
    );

    const sheets = yield select(selectSheets);
    const activeSheetIndex = yield select(selectActiveSheetIndex);
    const session = yield select(selectSession);

    if (sheets.length === 1) {
      // кейс 2.5, п 7.5.5.
      // Пользователя должно редиректить на список курсов
      navigate('Project', { projectId: session.projectId });
    } else if (activeSheetIndex === 0) {
      navigate('Session', {
        sessionId: session.id,
        sheetId: sheets[activeSheetIndex + 1].id,
      });
    } else {
      navigate('Session', {
        sessionId: session.id,
        sheetId: sheets[activeSheetIndex - 1].id,
      });
    }
  }

  yield put(removeSheetReceiveAction(sheetId));
}
