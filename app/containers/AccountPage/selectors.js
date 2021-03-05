/**
 * The projects state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

export const selectProjectsRoot = (state) => state.projects || initialState;
export const selectActiveProjectId = createSelector(
  [selectProjectsRoot],
  (projects) => projects.activeProjectId,
);

export const selectActiveCourseId = createSelector(
  [selectProjectsRoot],
  (projects) => projects.activeCourseId,
);

export const selectProjects = createSelector(
  [selectProjectsRoot],
  (projects) => projects.projects,
);

export const selectCourses = createSelector(
  [selectProjectsRoot],
  (projects) => projects.courses,
);

export const selectPagination = createSelector(
  selectProjectsRoot,
  (subState) => subState.pagination || {},
);

export const selectPaginationUsers = createSelector(
  selectProjectsRoot,
  (subState) => subState.paginationUsers || {},
);

export const selectPaginationPassing = createSelector(
  selectProjectsRoot,
  (subState) => subState.paginationPassing || {},
);

export const selectSessions = createSelector(
  [selectProjectsRoot],
  (projects) => projects.sessions,
);

export const selectActiveCourse = createSelector(
  [selectCourses, selectActiveCourseId],
  (courses, activeCourseId) =>
    courses.find((course) => course.id === activeCourseId) || {},
);
