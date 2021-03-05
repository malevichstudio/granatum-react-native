import { put } from 'redux-saga/effects';

import { linkedBlockReceive as linkedBlockReceiveAction } from '../actions';
// import forceUpdateBlockLayout from './forceUpdateBlockLayout';

export default function* linkedBlockReceive(payload) {
  yield put(linkedBlockReceiveAction(payload));
  // yield forceUpdateBlockLayout();
}
