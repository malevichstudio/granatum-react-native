import { ASK_PASSWORD_RESET_LINK } from '../constants';

/**
 * Make a request about receiving an email w/ password reset link
 * @param {string} email
 * @return {{type: string, email: *}}
 */
export const askPasswordResetLink = (payload) => ({
  type: ASK_PASSWORD_RESET_LINK,
  payload,
  meta: { thunk: true },
});
