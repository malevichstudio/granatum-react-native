import { SET_PASSWORD_REQUEST } from '../constants';

export const setPassword = (payload) => ({
  type: SET_PASSWORD_REQUEST,
  payload,
  meta: { thunk: true },
});
