/* eslint-disable default-case, no-param-reassign */

import produce from 'immer';

import * as types from '../constants';

// The initial state of the App
export const userInitialState = {
  /**
   * @type {string}
   */
  id: undefined,
  /**
   * Indicates is user logged in or not
   * @type {boolean}
   */
  isLoggedIn: false,
  /**
   * Account email, and it also used as username
   */
  email: null,
  name: null,
  /**
   * Account preferable language
   */
  lang: null,
  /**
   * Account registration status
   * @type {Enum}
   */
  status: null,
  avatar: null,
  birthday: null,
  gender: null,
  country: null,
  city: null,
};

/**
 * User reducer contains all current user data
 * @param state
 * @param action
 * @return {Produced<{id: null, username: null, email: null}, void>}
 */
const userReducer = (state = userInitialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_USER_DATA_SUCCESS:
        Object.assign(draft, action.payload);
        break;
      case types.SIGN_OUT_SUCCESS:
        Object.assign(draft, userInitialState);
        break;
      case types.CHANGE_LANG:
        draft.lang = action.lang;
        break;
    }
  });

export default userReducer;
