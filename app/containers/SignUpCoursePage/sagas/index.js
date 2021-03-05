import { takeEvery, takeLeading } from 'redux-saga/effects';
import { GET_COURSE_REQUEST, GET_COURSE_ACCESS_REQUEST } from '../constants';
import getCourse from './getCourse';
import getCourseAccess from './getCourseAccess';

export default function* saga() {
  yield takeEvery(GET_COURSE_REQUEST, getCourse);
  yield takeLeading(GET_COURSE_ACCESS_REQUEST, getCourseAccess);
}
