import { put, select, all } from 'redux-saga/effects';
import { SHEET_TYPE_PERSONAL } from 'app/constants';
import { isSessionAdmin } from 'app/utils/permissions';
import { leaveFromCourseUserReceive as leaveFromCourseUserReceiveAction } from '../actions/user';

import { closeChannel } from '../../../utils/api/actions';
import { selectActiveSheet } from '../selectors';
import { getTeamInSheetChannel } from '../../../utils/api/channels';

export default function* leaveFromCourseUserReceive(userIds) {
  yield put(leaveFromCourseUserReceiveAction(userIds));

  // Если админ находится на индивидуальном листе, мы должны проверить подписан
  // ли он на удаляемых пользователей и отписаться от их каналов, если да
  const role = yield select((state) => state.session.session.role);
  if (isSessionAdmin(role)) {
    const activeSheet = yield select(selectActiveSheet);

    if (activeSheet.type === SHEET_TYPE_PERSONAL) {
      const selectedTeamIds = yield select(
        (state) => state.session.selectedTeamIds,
      );

      // отписываемся от команд, только если мы на них подписаны
      yield all(
        userIds.map((id) => {
          if (selectedTeamIds.includes(id)) {
            return put(closeChannel(getTeamInSheetChannel(id, activeSheet.id)));
          }
          return null;
        }),
      );
    }
  }
}
