import { call, select, put } from 'redux-saga/effects';

import getSession from './getSession';
import { createOrUpdateChannel } from '../../../utils/api/actions';
import { isSessionAdmin } from '../../../utils/permissions';
import {
  getCourseChannel,
  getSessionChannel,
  getUserSessionChannel,
  getRoleInTargetChannel,
} from '../../../utils/api/channels';
import { COURSE_TYPE_SYNCHRONOUS } from '../../../constants';
import { navigate } from '../../../utils/RootNavigation';
import { addNotification } from '../../App/actions';
import getTeamsSets from './getTeamsSets';
import messages from '../messages';

export default function* enterSession({ sessionId, sheetId }) {
  yield call(getSession, { sessionId, sheetId });
  const userId = yield select((state) => state.user.id);
  const session = yield select((state) => state.session.session);
  const isAdmin = isSessionAdmin(session.role);
  // если пользователь зашёл на сессию, но она ещё не началась, не должны
  // подписывать его на канал сессии и т.д., чтобы он не отображался в активных
  // пользователях.
  // Однако, мы подписываем его на канал курса, чтобы поймать ивент о начале
  // сессии и только тогда мы заново перезапустим эту сагу
  if (
    session.courseType === COURSE_TYPE_SYNCHRONOUS &&
    session.timeToStart &&
    !session.finished &&
    !session.started &&
    !isSessionAdmin(session.role)
  ) {
    yield put(createOrUpdateChannel(getCourseChannel(session.courseId)));
    return;
  }

  if (isAdmin) {
    // Только для админов достаём все наборы команд, созданные в этой сессии
    // Эти данные нужны не прямо сейчас, а после открытия модалки управления
    // командами, но обновления по командам могут начать приходить сразу, поэтому
    // мы получаем эти данные сразу, как только зашли в сессию
    yield call(getTeamsSets);
  }

  // Подписываемся на каналы сессии только после того, как получим доступ к
  // сессии
  //
  // open new sheet channel connection
  yield put(createOrUpdateChannel(getSessionChannel(sessionId)));
  // подключаемся к каналу юзера внутри сессии. Сюда должны приходить
  // индивидуальные ивенты по этому юзеру, к примеру, подключение к команде
  yield put(createOrUpdateChannel(getUserSessionChannel(userId, sessionId)));

  yield put(
    createOrUpdateChannel(
      getRoleInTargetChannel(sessionId, isAdmin ? undefined : 'user'),
    ),
  );

  if (session.followMode && session.leader) {
    if (userId !== session.leader.id) {
      navigate('Session', {
        sessionId: session.id,
        sheetId: session.leader.location,
      });

      // Если чуть раньше того, как пользователь зашёл в сессию, ведущий отвалился
      // мы должны показывать уведомление об этом
      if (session.leaderLeft) {
        yield put(
          addNotification({
            message: messages.leaderDisconnected,
            type: 'warning',
          }),
        );
      }
    }
  }
}
