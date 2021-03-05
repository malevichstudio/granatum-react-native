import { takeEvery } from 'redux-saga/effects';

import getProjects from './getProjects';
import enterProject from './enterProject';
import enterProjects from './enterProjects';
import getCourses from './getCourses';
import getCourse from './getCourse';
import enterCourse from './enterCourse';
import getSessions from './getSessions';
import * as types from '../constants';
import {
  receiveCourseMessage,
  receiveProjectMessage,
  receiveUserMessage,
} from '../../../utils/api/actions';
import handleProjectMessages from './handleProjectMessage';

export default function* saga() {
  yield takeEvery(types.GET_PROJECTS_REQUEST, getProjects);
  yield takeEvery(types.ENTER_PROJECT, enterProject);
  yield takeEvery(types.ENTER_PROJECTS, enterProjects);
  yield takeEvery(types.GET_COURSES_REQUEST, getCourses);
  yield takeEvery(types.GET_COURSE_REQUEST, getCourse);
  yield takeEvery(types.ENTER_COURSE, enterCourse);
  yield takeEvery(types.GET_SESSIONS_REQUEST, getSessions);
  yield takeEvery(
    [
      receiveCourseMessage.toString(),
      receiveUserMessage.toString(),
      receiveProjectMessage.toString(),
    ],
    handleProjectMessages,
  );
}
