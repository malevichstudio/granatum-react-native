import {
  SIGN_UP_VIA_EMAIL_REQUEST,
  SIGN_UP_VIA_EMAIL_SUCCESS,
} from '../constants';

/**
 * Register new account via email
 * @param {{ name: string, surname: string, email: string, password: string, lang: string }} payload
 * @return {{type: string, payload: *}}
 */
export const signUp = payload => ({
  type: SIGN_UP_VIA_EMAIL_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signUpSuccess = ({ meta }) => ({
  type: SIGN_UP_VIA_EMAIL_SUCCESS,
  meta,
});
