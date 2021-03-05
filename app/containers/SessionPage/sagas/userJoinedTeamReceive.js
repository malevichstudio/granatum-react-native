import { put, select } from 'redux-saga/effects';

import { addUsersToTeamsReceive } from '../actions';
import { selectActiveTeamsSetId } from '../selectors';

export default function* userJoinedTeamReceive(usersToTeams, teamsSetId) {
  const activeTeamsSetId = yield select(selectActiveTeamsSetId);

  // Если админ находится на другом листе и там набор другой, то ничего не делаем
  if (activeTeamsSetId === teamsSetId) {
    yield put(addUsersToTeamsReceive(usersToTeams));
  }
}
