import { createSelector } from 'reselect';

import { injectionKeys } from '../../config';
import { initialState } from './reducers';

/**
 * Direct selector to the `session` state domain
 */
const selectSessionDomain = (state) =>
  state[injectionKeys.registerCourse] || initialState;

export const selectCourse = createSelector(
  selectSessionDomain,
  (subState) => subState.course,
);

export const selectProjectId = createSelector(
  selectSessionDomain,
  (subState) => subState.projectId,
);
