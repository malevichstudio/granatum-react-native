import { put, select } from 'redux-saga/effects';

import { updateUsersToTeams } from '../actions';
import { selectActiveTeamsSetId } from '../selectors';

export default function* updateUsersToTeamsReceive(teamsSetId, usersToTeams) {
  const activeTeamsSetId = yield select(selectActiveTeamsSetId);

  // меняем usersToTeams только в том случае, если именно этот набор был изменён
  if (typeof activeTeamsSetId === 'string' && teamsSetId === activeTeamsSetId) {
    yield put(updateUsersToTeams(usersToTeams));
  }
}
