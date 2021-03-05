import produce from 'immer';
import {
  GET_COURSE_SUCCESS,
  GET_COURSE_ACCESS_FAILURE,
  GET_COURSE_ACCESS_REQUEST,
  GET_COURSE_ACCESS_SUCCESS,
} from '../constants';

/**
 * this is session reducer.
 */
export const initialState = {
  course: {},
  // getCourseAccess возвращает projectId необходимый для редиректа.
  // Если его нету, то редиректить нельзя юзера на страницу сессий/курсов.
  projectId: null,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_COURSE_SUCCESS:
        draft.course = action.payload;
        break;

      case GET_COURSE_ACCESS_REQUEST:
        draft.projectId = null;
        break;

      case GET_COURSE_ACCESS_SUCCESS:
        draft.projectId = action.payload;
        break;

      case GET_COURSE_ACCESS_FAILURE:
        draft.projectId = false;
        break;
    }
  });
