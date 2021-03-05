import {
  SIGN_IN_VIA_SOCIAL_REQUEST,
  SIGN_IN_VIA_SOCIAL_SUCCESS,
  REGISTRATION_OAUTH_REQUEST,
} from '../constants';

/**
 * Sign in via google
 * @param {{ token: string }} payload
 * @return {{type: string, payload: *}}
 */
export const signInViaSocial = payload => ({
  type: SIGN_IN_VIA_SOCIAL_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signInViaSocialSuccess = ({ payload, meta }) => ({
  type: SIGN_IN_VIA_SOCIAL_SUCCESS,
  payload,
  meta,
});

export const registrationOauth = payload => ({
  type: REGISTRATION_OAUTH_REQUEST,
  payload,
  meta: { thunk: true },
});
