import { put } from 'redux-saga/effects';

import { closeChannel } from '../../../utils/api/actions';
import { getCourseChannel } from '../../../utils/api/channels';

export default function* leaveCourse(courseId) {
  yield put(closeChannel(getCourseChannel(courseId)));
}
