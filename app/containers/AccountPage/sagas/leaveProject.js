import { put } from 'redux-saga/effects';

import { closeChannel } from '../../../utils/api/actions';
import { getProjectChannel } from '../../../utils/api/channels';
import { leaveProjectSuccess } from '../actions';

export default function* leaveProject(projectId) {
  yield put(closeChannel(getProjectChannel(projectId)));
  yield put(leaveProjectSuccess(projectId));
}
