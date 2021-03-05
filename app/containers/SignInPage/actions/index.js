import {
  SIGN_IN_VIA_EMAIL_REQUEST,
  SIGN_IN_VIA_EMAIL_SUCCESS,
} from '../constants';

/**
 * Sign in via email
 * @param {{ email: string, password: string }} payload
 * @return {{type: string, payload: *}}
 */
export const signInViaEmail = (payload) => ({
  type: SIGN_IN_VIA_EMAIL_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signInViaEmailSuccess = ({ meta }) => ({
  type: SIGN_IN_VIA_EMAIL_SUCCESS,
  meta,
});
