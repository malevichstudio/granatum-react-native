import { put, call } from 'redux-saga/effects';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { toogleWaitUserByAdmin } from '../actions/user';

export default function* adminInvokedUser(payload) {
  yield put(toogleWaitUserByAdmin({ id: payload.value, wait: true }));
  if (Platform.OS === 'ios') {
    BackgroundTimer.start();
  }
  const delay = (time) =>
    new Promise((resolve) => BackgroundTimer.setTimeout(resolve, time));
  yield call(delay, 3000);
  if (Platform.OS === 'ios') {
    BackgroundTimer.stop();
  }
  yield put(toogleWaitUserByAdmin({ id: payload.value, wait: false }));
}
