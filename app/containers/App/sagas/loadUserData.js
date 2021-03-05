import { call, put, select } from 'redux-saga/effects';
import requestSaga from '../../../utils/api/requestSaga';
import { api } from '../../../config';
import { LOAD_USER_DATA_FAILURE, GUEST_PROBE_FAILURE } from '../constants';
import { loadUserDataSuccess } from '../actions';
import { createOrUpdateChannel } from '../../../utils/api/actions';
import { getUserChannel } from '../../../utils/api/channels';
import { selectOpenedByLink } from '../selectors';
import { setAuthToken, getAuthToken } from 'app/utils/storage';
import { setIsQuest } from '../actions';
import BackgroundTimer from 'react-native-background-timer';
import { Platform } from 'react-native';

export default function* loadUserData() {
  const accessToken = yield call(getAuthToken);
  const openedByLink = yield select(selectOpenedByLink);

  // user is a guest (not authenticated). Skip this saga
  // Мы немного меняем логику. Теперь на некоторые типы проектов (открытые), мы
  // пускаем людей без регистрации и аутентификации. Бек будут на лету генери-
  // ровать для них учётные записи
  if (
    typeof accessToken !== 'string' &&
    typeof openedByLink?.session !== 'string' &&
    typeof openedByLink?.course !== 'string'
  ) {
    return;
  }

  if (openedByLink?.session || openedByLink?.course) {
    const query = {};

    if (openedByLink?.session) {
      query.sessionId = openedByLink?.session;
    } else if (openedByLink?.course) {
      query.courseId = openedByLink?.course;
    }

    // Проверяем, залогинен ли этот пользователь в проекте. Если это ОТКРЫТЫЙ
    // проект, то пользователь может получить в ответе свежий токен. Если у
    // пользователя уже есть протухший токен, то бек всё-равно вернёт свежий
    // токен для такого пользоватея

    const data = yield call(
      requestSaga,
      api.endpoints.guestProbe.post,
      GUEST_PROBE_FAILURE,
      { query },
    );

    if (data?.requestedUsername) {
      yield put(setIsQuest(true));
      return;
    }

    if (data?.token) {
      setAuthToken(data.token, 'accessToken');
    }
  }

  const data = yield call(
    requestSaga,
    api.endpoints.account.get,
    LOAD_USER_DATA_FAILURE,
  );

  if (!data || typeof data.error === 'string') {
    return;
  }

  yield put(loadUserDataSuccess(data));
  if (Platform.OS === 'ios') {
    BackgroundTimer.start();
  }
  const delay = (time) =>
    new Promise((resolve) => BackgroundTimer.setTimeout(resolve, time));
  yield call(delay, 3000);
  if (Platform.OS === 'ios') {
    BackgroundTimer.stop();
  }

  yield put(createOrUpdateChannel(getUserChannel(data.id)));
}
