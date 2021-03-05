import { all, put, select } from 'redux-saga/effects';
import { selectProjects } from '../selectors';
import { closeChannel } from '../../../utils/api/actions';
import { getProjectChannel } from '../../../utils/api/channels';

export default function* leaveProjects() {
  const projects = yield select(selectProjects);

  yield all(projects.map(({ id }) => put(closeChannel(getProjectChannel(id)))));
}
