/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import appReducer from './containers/App/reducers';
import userReducer from './containers/App/reducers/user';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    app: appReducer,
    user: userReducer,
    ...injectedReducers,
  });
}
