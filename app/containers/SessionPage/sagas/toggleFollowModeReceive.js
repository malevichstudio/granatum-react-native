import { put, select } from 'redux-saga/effects';

import { updateSessionReceive } from '../actions';
import messages from '../messages';
import { addNotification } from '../../App/actions';
import { navigate } from '../../../utils/RootNavigation';

/**
 * Сага, которая срабатывает в тот момент, когда приходит ивент на включение/выключение
 * режима следования
 * @param {string} payload.id - id ведущего
 * @param {string} payload.avatar - адрес аватарки ведущего
 * @param {string} payload.name - имя ведущего
 * @param {string} payload.location - id листа, на котором находится ведущий
 * @case 2.24 https://docs.google.com/document/d/1TODAHgTeWzxtbEIvSRpoqkZalXSwOMKmWQJXvONj20Q/edit#
 */
export default function* toggleFollowMode(payload) {
  yield put(
    updateSessionReceive({
      followMode: true,
      leader: payload,
    }),
  );

  const userId = yield select((state) => state.user.id);

  // Если пользователь -- сам ведущий, то остальные сайд-эффекты его некасаются
  if (userId === payload.id) {
    return;
  }
  yield put(
    addNotification({
      message: {
        ...messages.youAreNowFollowing,
        values: {
          value: payload.name,
        },
      },
      type: 'warning',
    }),
  );

  const activeSheetId = yield select((state) => state.session.activeSheetId);
  // Если пользователь в данный момент находится на другом листе, нежели ведущий,
  // редиректим его на лист ведущего
  if (activeSheetId !== payload.location) {
    const sessionId = yield select((state) => state.session.session.id);
    navigate('Session', {
      sessionId,
      sheetId: payload.location,
    });
  }
}
