import { put, select, all } from 'redux-saga/effects';

import { closeChannel } from '../../../utils/api/actions';
import {
  getSessionChannel,
  getUserSessionChannel,
  getRoleInTargetChannel,
} from '../../../utils/api/channels';
import closeSheetChannels from './closeSheetChannels';
import { isSessionAdmin } from '../../../utils/permissions';

/**
 * Мы вызываем эту сагу непосредственно из компонента Сессии, поскольку иначе
 * нельзя. Эта сага нужна на размонтировании компонента, а в данном случае
 * срабатывает cancel() на все подписки саг
 */
export default function* leaveSession({ sessionId }) {
  const userId = yield select((state) => state.user.id);
  const sheetId = yield select((state) => state.session.activeSheetId);
  const role = yield select((state) => state.session.session.role);
  const isAdmin = isSessionAdmin(role);

  yield all([
    // we are disconnecting from this session webSocket channel
    put(closeChannel(getSessionChannel(sessionId))),
    // также отписываемся от канала юзера внутри сессии
    put(closeChannel(getUserSessionChannel(userId, sessionId))),
    put(
      closeChannel(
        getRoleInTargetChannel(sessionId, isAdmin ? undefined : 'user'),
      ),
    ),
  ]);

  // Помимо отписки от канало сессии, мы также отписываемся и от канало листа
  // и команды, поскольку сага leaveSheet не сработает в тот момент, когда мы
  // покидаем сессию
  yield closeSheetChannels(sheetId);
}
