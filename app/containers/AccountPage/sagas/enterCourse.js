import { put } from 'redux-saga/effects';
import { setActiveCourse, getCourse } from '../actions';
import { createOrUpdateChannel } from '../../../utils/api/actions';
import { getCourseChannel } from '../../../utils/api/channels';

export default function* enterCourse({ courseId }) {
  yield put(setActiveCourse(courseId));

  yield put(
    getCourse({
      id: courseId,
    }),
  );
  yield put(createOrUpdateChannel(getCourseChannel(courseId)));
}
