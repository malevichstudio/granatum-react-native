import { all, call, put, select } from 'redux-saga/effects';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { createOrUpdateChannel } from '../../../utils/api/actions';
import { getProjectChannel } from '../../../utils/api/channels';
import { selectProjects } from '../selectors';

export default function* enterProjects() {
  const projects = yield call(getProjects);

  // подписываем на все доступные проекты
  yield all(
    projects.map(({ id }) => put(createOrUpdateChannel(getProjectChannel(id)))),
  );
}

/**
 * сага, которая ждёт пока придут данные по проектам
 */
function* getProjects() {
  if (Platform.OS === 'ios') {
    BackgroundTimer.start();
  }
  while (true) {
    const projects = yield select(selectProjects);

    if (projects.length) {
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }
      return projects;
    }

    const delay = (time) =>
      new Promise((resolve) => BackgroundTimer.setTimeout(resolve, time));
    yield call(delay, 50);
  }
}
