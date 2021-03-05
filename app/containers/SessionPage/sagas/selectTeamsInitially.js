import { all, put, select } from 'redux-saga/effects';

import { selectChatsWithTeam, selectTeams } from '../actions';
import { makeSelectTeamsSetTeams } from '../selectors';

/**
 * В самой сессии подключаемся ко всем командам, а в видео-чате к самой первой
 * команде
 * @param teamsSetId
 */
export default function* selectTeamsInitially(teamsSetId) {
  // вытаскиваем команды, относящиеся к набору
  const teams = yield select(makeSelectTeamsSetTeams(teamsSetId));
  if (Array.isArray(teams) && teams.length) {
    yield all([
      // админ должен видить контент всех команд/пользователей
      put(
        selectTeams(
          teams.map((team) => team.id),
          true,
        ),
      ),
      // нам нужно выбрать самую первую команду как активную
      put(selectChatsWithTeam(teams[0].id)),
    ]);
  }
}
