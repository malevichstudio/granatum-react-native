import { put, select } from 'redux-saga/effects';
import { createTeamReceive as createTeamReceiveAction } from '../actions';
import { isSessionAdmin } from '../../../utils/permissions';
import { selectTeams } from '../actions';
import selectTeamsInitially from './selectTeamsInitially';

/**
 * Создание команды
 *
 * В этой саге обрабатывается кейс, когда админ создаёт новый набор при включенном
 * автораспределении, и ему чуть позже создаётся команда, но эта команда не
 * выбирается автоматически
 *
 * Также эта сага срабатывает, когда новый пользователь только зарегистировался
 * по ивайту на сессию и под него создалась новая команда. В таком случае, если
 * у нас выбраны все команды, мы должны и дополнительно выбрать и эту новую
 * команду
 *
 * @param team
 */
export default function* createTeamReceive(team) {
  yield put(createTeamReceiveAction(team.teamSetId, team));

  const role = yield select((state) => state.session.session.role);

  // Если пользователь админ
  if (isSessionAdmin(role)) {
    const selectedTeamIds = yield select(
      (state) => state.session.selectedTeamIds,
    );

    // и у него не выбрана ни одна команда,
    if (!Array.isArray(selectedTeamIds) || !selectedTeamIds.length) {
      // то мы должны выбрать ему новую команду, чтобы у него была хотя бы одна
      // выбрана
      yield selectTeamsInitially(team.teamSetId);
    } else {
      const selectAllTeams = yield select(
        (state) => state.session.selectAllTeams,
      );

      // далее, если стоит настройка выбирать все команды, то мы добавляем
      // дополнительно выбираем эту команду
      if (selectAllTeams) {
        yield put(selectTeams([...selectedTeamIds, team.id], true));
      }
    }
  }
}
