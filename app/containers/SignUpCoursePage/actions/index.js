import {
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  SIGN_UP_VIA_EMAIL_REQUEST,
  SIGN_UP_VIA_EMAIL_SUCCESS,
  SIGN_IN_VIA_EMAIL_REQUEST,
  SIGN_IN_VIA_EMAIL_SUCCESS,
  GET_COURSE_ACCESS_REQUEST,
  GET_COURSE_ACCESS_SUCCESS,
} from '../constants';

export const getCourse = (payload) => ({
  type: GET_COURSE_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getCourseSuccess = (payload, meta) => ({
  type: GET_COURSE_SUCCESS,
  payload,
  meta,
});

export const signUp = (payload) => ({
  type: SIGN_UP_VIA_EMAIL_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signUpSuccess = ({ meta }) => ({
  type: SIGN_UP_VIA_EMAIL_SUCCESS,
  meta,
});

export const signInViaEmail = (payload) => ({
  type: SIGN_IN_VIA_EMAIL_REQUEST,
  payload,
  meta: { thunk: true },
});

export const signInViaEmailSuccess = ({ meta }) => ({
  type: SIGN_IN_VIA_EMAIL_SUCCESS,
  meta,
});

export const getCourseAccess = (payload) => ({
  type: GET_COURSE_ACCESS_REQUEST,
  payload,
});

export const getCourseAccessSuccess = (payload) => ({
  type: GET_COURSE_ACCESS_SUCCESS,
  payload,
});
