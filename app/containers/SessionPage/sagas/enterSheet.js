import { call, put, all, select } from 'redux-saga/effects';

import getSheet from './getSheet';
import {
  setActiveSheetId,
  flushSelectedTeam,
  enterSheetComplete,
  selectChatsWithTeam,
  selectTeams,
} from '../actions';
import { selectActiveSheet, selectActiveSheetTeams } from '../selectors';
import { createOrUpdateChannel } from '../../../utils/api/actions';
import { isSessionAdmin } from '../../../utils/permissions';
import {
  getSheetChannel,
  getUserInTeamSetChannel,
  getRoleInTargetChannel,
  getUserSheetChannel,
} from '../../../utils/api/channels';
import {
  SHEET_TYPE_COMMON,
  COURSE_TYPE_SYNCHRONOUS,
  SHEET_TYPE_TEAM,
  SHEET_TYPE_PERSONAL,
} from '../../../constants';
import getBlocks from './getBlocks';
import getSheetWidgets from './getSheetWidgets';
import getSheetContent from './getSheetContent';
import getTimers from './getTimers';

export default function* enterSheet({ sheetId }) {
  // Это для случая, когда пользователь заходит первый раз в рамках текущей
  // сессии посещения
  if (typeof sheetId !== 'string') {
    console.log('Должен быть редирект на 404');
    return;
  }

  // Этот экшен должен вызываться именно здесь, потому что его результат нужен в
  // саге getSheets, которая вызывается внутри getSession
  yield put(setActiveSheetId(sheetId));

  // for (let i = 0; i < 500; i += 1) {
  //   const sessionId = yield select((state) => state.session?.session?.id);
  //
  //   if (typeof sessionId === 'string') {
  //     break;
  //   }
  //   yield delay(50);
  // }

  const session = yield select((state) => state.session.session);
  const isAdmin = isSessionAdmin(session.role);
  if (
    session.courseType === COURSE_TYPE_SYNCHRONOUS &&
    session.timeToStart &&
    !session.finished &&
    !session.started &&
    !isAdmin
  ) {
    return;
  }

  // Для самого первого захода на сессию этот запрос избыточен, но мы это принимаем
  yield call(getSheet, sheetId);

  // Подписываемся на лист, только после получения доступа
  yield put(createOrUpdateChannel(getSheetChannel(sheetId)));

  yield put(
    createOrUpdateChannel(
      getRoleInTargetChannel(sheetId, isAdmin ? undefined : 'user'),
    ),
  );

  // Если лист не существует, сразу же переходим на /404
  const sheet = yield select(selectActiveSheet);
  if (!sheet) {
    return;
  }

  if (isAdmin || sheet.type === SHEET_TYPE_COMMON) {
    // Запросы делаем последовательно
    // and widgets
    yield call(getSheetWidgets);
    // Закружаем блоки в самом конце, чтобы уменьшить кол-во ререндеров, потому что
    // иначе у нас будут рендериться блоки, затем виджеты, затем контент, а так
    // сразу всё.
    yield call(getBlocks);
    // and all available users content
    yield call(getSheetContent);
  }

  if (isAdmin) {
    // Мы проверяем командный/индивидуальный ли это лист через следующий запрос.
    // Если есть команды то мы с ними работаем. Если нет, то либо лист не
    // командный/индивидуальный, либо на нём пока ещё не создано ни одной команды
    if (sheet.type === SHEET_TYPE_TEAM || sheet.type === SHEET_TYPE_PERSONAL) {
      const teams = yield select(selectActiveSheetTeams);

      if (Array.isArray(teams)) {
        // команды уже в процессе формирования
        if (teams.length) {
          yield all([
            // При заходе на командный/индивидуальный лист, админ, по умолчанию, видет
            // контент всех команд/пользователей
            put(
              selectTeams(
                teams.map((team) => team.id),
                true,
              ),
            ),
            // Если на листе существуют команды, то мы понимаем, что это либо командный,
            // либо индивидуальный лист, и тогда нам нужно выбрать самую первую команду
            // как активную. Админ будет загружен в эту команду по умолчанию при заходе
            // на лист
            put(selectChatsWithTeam(teams[0].id)),
          ]);
        }
      }
    }
  } else {
    const userId = yield select((state) => state.user.id);
    // Пользователя подписываем на канал листа для пользователя

    yield put(createOrUpdateChannel(getUserSheetChannel(userId, sheetId)));

    // Если это обычный пользователь и вместе с листом приходит teamsetId, что
    // значит что этот лист командный, то мы должны подписаться на канал НАБОРА
    // куда будут приходить все ивенты по команде
    if (typeof sheet.teamsetId === 'string') {
      yield put(
        createOrUpdateChannel(getUserInTeamSetChannel(userId, sheet.teamsetId)),
      );
    }
  }

  if (sheet.type === SHEET_TYPE_COMMON) {
    const selectedTeam = yield select((state) => state.session.team);

    if (selectedTeam?.id) {
      yield put(flushSelectedTeam());
    }
  }

  yield call(getTimers, sheetId);
  yield put(enterSheetComplete());
}
