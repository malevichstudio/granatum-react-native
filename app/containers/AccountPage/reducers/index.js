import produce from 'immer';

import * as types from '../constants';

// The initial state of the App
export const initialState = {
  activeProjectId: undefined,
  activeCourseId: undefined,
  sessions: [],
  courses: [],
  projects: [],
  pagination: {
    page: 0,
    totalPages: 0,
    totalElements: 0,
  },
  filtersProjects: {},
  filtersCourses: {},
};

/* eslint-disable default-case, no-param-reassign */
const projectsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_PROJECTS_SUCCESS:
        if (action.payload.number === 0) {
          draft.projects = action.payload.content;
        } else {
          draft.projects = state.projects.concat(action.payload.content);
        }
        draft.pagination.page = action.payload.number;
        draft.pagination.totalPages = action.payload.totalPages;
        break;

      case types.GET_PROJECTS_REQUEST:
        if (!action.payload.page) {
          draft.filtersProjects = action.payload.name
            ? { name: action.payload.name }
            : {};
          draft.pagination.page = 0;
          draft.pagination.totalPages = 0;
        }
        break;
      case types.SET_ACTIVE_COURSE:
        draft.activeCourseId = action.id;
        break;

      case types.SET_ACTIVE_PROJECT:
        draft.activeProjectId = action.id;
        break;

      case types.GET_COURSES_REQUEST:
        if (!action.payload.page) {
          draft.filtersCourses = action.payload.filtersCourses;
          draft.pagination.page = 0;
          draft.pagination.totalPages = 0;
        }
        break;

      case types.GET_COURSES_SUCCESS:
        if (action.payload.number === 0) {
          draft.courses = action.payload.content;
        } else {
          draft.courses = state.courses.concat(action.payload.content);
        }
        draft.pagination.totalElements = action.payload.totalElements;
        draft.pagination.page = action.payload.number;
        draft.pagination.totalPages = action.payload.totalPages;
        break;

      case types.GET_PROJECT_SUCCESS:
        if (!state.projects.some(({ id }) => id === action.payload.id)) {
          draft.projects.push(action.payload);
        } else {
          draft.projects = state.projects.map((project) =>
            project.id === action.payload.id
              ? { ...project, ...action.payload }
              : project,
          );
        }
        break;

      case types.GET_COURSE_SUCCESS:
        if (!state.courses.some(({ id }) => id === action.payload.id)) {
          draft.courses.push(action.payload);
        } else {
          draft.courses = state.courses.map((course) =>
            course.id === action.payload.id
              ? { ...course, ...action.payload }
              : course,
          );
        }
        break;
      case types.GET_SESSIONS_SUCCESS:
        // без этого крашится страница сессии при первом заходе, помогает перезагрузка с очисткой кэша.
        if (action.payload) {
          // массив приходит в замороженом состоянии, что бы над ним проводить манипуляции
          // такие как сортировка, нужно его сначала клонировать
          draft.sessions = [...action.payload].sort(
            (next, prev) => next.orderIndex - prev.orderIndex,
          );
        }
        break;
      case types.UPDATE_PROJECT_RECEIVE: {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          draft.projects[index] = {
            ...state.projects[index],
            ...action.payload,
          };
        }
        break;
      }

      case types.CREATE_PROJECT_RECEIVE:
      case types.JOIN_PROJECT_RECEIVE:
        draft.projects.push(action.payload);
        break;

      case types.REMOVE_PROJECT_RECEIVE:
      case types.LEAVE_PROJECT_RECEIVE:
        draft.projects = state.projects.filter(
          (project) => project.id !== action.projectId,
        );
        break;
      case types.CREATE_COURSE_RECEIVE:
        draft.courses.push(action.payload);
        break;

      case types.UPDATE_COURSE_RECEIVE:
        draft.courses = state.courses.map((course) =>
          course.id === action.payload.id
            ? { ...course, ...action.payload }
            : course,
        );
        break;

      case types.DELETE_COURSE_RECEIVE:
        draft.courses = state.courses.filter(
          (course) => course.id !== action.payload,
        );
        break;
      case types.REMOVE_SESSION_RECEIVE:
        draft.sessions = state.sessions.filter(
          (session) => session.id !== action.payload,
        );
        break;

      case types.UPDATE_SESSION_RECEIVE: {
        const index = state.sessions.findIndex(
          (session) => session.id === action.payload.id,
        );

        if (index !== -1) {
          draft.sessions[index] = {
            ...state.sessions[index],
            ...action.payload,
          };
        }
        break;
      }
      case types.SESSION_NOTIFICATIONS_RECEIVE:
        draft.sessions = state.sessions.map((session) => {
          const newSession = action.payload.find(({ id }) => id === session.id);
          if (newSession) {
            return {
              ...session,
              ...newSession,
            };
          }

          return session;
        });
        break;

      case types.SORT_SESSION_RECEIVE:
        draft.sessions = action.payload
          .sort((next, prev) => next.orderIndex - prev.orderIndex)
          .map((newSession) => ({
            ...state.sessions.find((session) => session.id === newSession.id),
            ...newSession,
          }));
        break;
      case types.CREATE_SESSION_RECEIVE:
        draft.sessions.push(action.payload);
        break;
    }
  });

export default projectsReducer;
