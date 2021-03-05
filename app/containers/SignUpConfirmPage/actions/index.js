import { SIGN_UP_CONFIRM_REQUEST, SIGN_UP_CONFIRM_SUCCESS } from '../constants';

export const signUpConfirm = (payload) => ({
  type: SIGN_UP_CONFIRM_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signUpConfirmSuccess = () => ({
  type: SIGN_UP_CONFIRM_SUCCESS,
});
