import { put, select } from 'redux-saga/effects';
import { createSessionReceive as createSessionReceiveAction } from '../actions';

export default function* createSessionReceive(payload) {
  const { activeCourseId } = yield select((state) => state.projects);
  if (payload.courseId === activeCourseId) {
    yield put(createSessionReceiveAction(payload));
  }
}
