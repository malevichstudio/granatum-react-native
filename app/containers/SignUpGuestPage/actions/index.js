import { SIGN_UP_GUEST_REQUEST, SIGN_UP_GUEST_SUCCESS } from '../constants';

export const signUpGuest = (payload) => ({
  type: SIGN_UP_GUEST_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signUpGuestSuccess = ({ meta }) => ({
  type: SIGN_UP_GUEST_SUCCESS,
  meta,
});
