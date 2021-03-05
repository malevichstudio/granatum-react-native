import { put, call } from 'redux-saga/effects';

import forbidPage from 'app/containers/App/sagas/forbidPage';
import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { createOrUpdateChannel } from '../../../utils/api/actions';
import { getProjectChannel } from '../../../utils/api/channels';
import { setActiveProject, getProjectSuccess } from '../actions';
import { GET_PROJECT_FAILURE } from '../constants';

export default function* enterProject({ projectId }) {
  yield put(setActiveProject(projectId));

  const data = yield call(
    requestSaga,
    api.endpoints.projectsOne.get,
    GET_PROJECT_FAILURE,
    {
      id: projectId,
    },
    undefined,
    {
      withNotify: true,
    },
  );

  if ((data && data.error) || !data) {
    if (data?.status === 403) {
      yield forbidPage();
    }
    return;
  }

  yield put(createOrUpdateChannel(getProjectChannel(projectId)));

  yield put(getProjectSuccess({ payload: data }));
}
