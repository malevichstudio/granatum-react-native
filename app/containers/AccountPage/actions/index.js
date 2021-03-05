import * as types from '../constants';

export const getProjects = (payload) => ({
  type: types.GET_PROJECTS_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getProjectsSuccess = ({ payload, meta }) => ({
  type: types.GET_PROJECTS_SUCCESS,
  payload,
  meta,
});

export const getProject = (payload) => ({
  type: types.GET_PROJECT_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getProjectSuccess = ({ payload, meta }) => ({
  type: types.GET_PROJECT_SUCCESS,
  payload,
  meta,
});

export const getCourses = (payload) => ({
  type: types.GET_COURSES_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getCoursesSuccess = ({ payload, meta }) => ({
  type: types.GET_COURSES_SUCCESS,
  payload,
  meta,
});

export const enterProject = (projectId) => ({
  type: types.ENTER_PROJECT,
  projectId,
});

export const enterProjects = (projectId) => ({
  type: types.ENTER_PROJECTS,
  projectId,
});

export const setActiveProject = (id) => ({
  type: types.SET_ACTIVE_PROJECT,
  id,
});

export const setActiveCourse = (id) => ({
  type: types.SET_ACTIVE_COURSE,
  id,
});

export const getCourse = (payload) => ({
  type: types.GET_COURSE_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getCourseSuccess = ({ payload, meta }) => ({
  type: types.GET_COURSE_SUCCESS,
  payload,
  meta,
});

export const enterCourse = (courseId) => ({
  type: types.ENTER_COURSE,
  courseId,
});

export const getSessions = (payload) => ({
  type: types.GET_SESSIONS_REQUEST,
  payload,
});

export const getSessionsSuccess = (payload) => ({
  type: types.GET_SESSIONS_SUCCESS,
  payload,
});

export const createProject = (payload) => ({
  type: types.CREATE_PROJECT_REQUEST,
  payload,
});

export const createProjectReceive = (payload) => ({
  type: types.CREATE_PROJECT_RECEIVE,
  payload,
});

export const updateProject = (payload) => ({
  type: types.UPDATE_PROJECT_REQUEST,
  payload,
});

export const updateProjectReceive = (payload) => ({
  type: types.UPDATE_PROJECT_RECEIVE,
  payload,
});

export const joinProjectReceive = (payload) => ({
  type: types.JOIN_PROJECT_RECEIVE,
  payload,
});
export const leaveProjects = () => ({
  type: types.LEAVE_PROJECTS,
});

export const leaveProjectReceive = (projectId) => ({
  type: types.LEAVE_PROJECT_RECEIVE,
  projectId,
});

export const leaveProjectSuccess = (payload) => ({
  type: types.LEAVE_PROJECT_SUCCESS,
  payload,
});

export const removeProject = (projectId) => ({
  type: types.REMOVE_PROJECT_REQUEST,
  projectId,
});

export const removeProjectReceive = (projectId) => ({
  type: types.REMOVE_PROJECT_RECEIVE,
  projectId,
});

export const createCourseReceive = (payload) => ({
  type: types.CREATE_COURSE_RECEIVE,
  payload,
});

export const updateCourseReceive = (payload) => ({
  type: types.UPDATE_COURSE_RECEIVE,
  payload,
});

export const deleteCourseReceive = (payload) => ({
  type: types.DELETE_COURSE_RECEIVE,
  payload,
});

export const removeSessionReceive = (payload) => ({
  type: types.REMOVE_SESSION_RECEIVE,
  payload,
});

export const updateSessionReceive = (payload) => ({
  type: types.UPDATE_SESSION_RECEIVE,
  payload,
});

export const sessionNotificationsReceive = (payload) => ({
  type: types.SESSION_NOTIFICATIONS_RECEIVE,
  payload,
});

export const sortSessionReceive = (payload) => ({
  type: types.SORT_SESSION_RECEIVE,
  payload,
});

export const createSessionReceive = (payload) => ({
  type: types.CREATE_SESSION_RECEIVE,
  payload,
});
