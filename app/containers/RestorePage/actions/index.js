import {
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  CHECK_TOKEN_REQUEST,
} from '../constants';

/**
 * Restore password
 */
export const restorePassword = (payload) => ({
  type: RESTORE_PASSWORD_REQUEST,
  payload,
  meta: { thunk: true },
});

export const restorePasswordSuccess = ({ meta }) => ({
  type: RESTORE_PASSWORD_SUCCESS,
  meta,
});

export const checkToken = (payload) => ({
  type: CHECK_TOKEN_REQUEST,
  payload,
});
