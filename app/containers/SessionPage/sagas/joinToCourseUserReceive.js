import { put, select } from 'redux-saga/effects';
import { SHEET_TYPE_PERSONAL } from 'app/constants';
import { joinToCourseUserReceive as joinToCourseUserReceiveAction } from '../actions/user';
import { isSessionAdmin } from '../../../utils/permissions';
import { selectTeams } from '../actions';
import { selectActiveSheet } from '../selectors';

export default function* joinToCourseUserReceive(users) {
  yield put(joinToCourseUserReceiveAction(users));
  // Пользователям дали доступ к курсу и мы должны подписаться на их команды,
  // если мы -- админ и находимся на индивидуальном листе
  const role = yield select((state) => state.session.session.role);
  if (isSessionAdmin(role)) {
    const activeSheet = yield select(selectActiveSheet);

    if (activeSheet.type === SHEET_TYPE_PERSONAL) {
      const selectAllTeams = yield select(
        (state) => state.session.selectAllTeams,
      );
      // Если выбраны все команды на индивидуальном листе, то, подписываемся
      // на новых пользователей
      if (selectAllTeams) {
        // нужно перевыбрать всех пользователей
        const selectedTeamIds = yield select(
          (state) => state.session.selectedTeamIds,
        );

        // Подписка приозойдёт вот в этом экшене
        yield put(
          selectTeams(
            [...selectedTeamIds, ...users.map((team) => team.id)],
            true,
          ),
        );
      }
    }
  }
}
