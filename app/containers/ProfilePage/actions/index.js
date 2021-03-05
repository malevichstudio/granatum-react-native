import {
  UPDATE_ACCOUNT_AVATAR_REQUEST,
  UPDATE_ACCOUNT_AVATAR_SUCCESS,
  UPDATE_ACCOUNT_INFO_REQUEST,
  UPDATE_ACCOUNT_PASSWORD_REQUEST,
  UPDATE_ACCOUNT_PASSWORD_SUCCESS,
  CONNECT_ACCOUNT_SOCIAL_REQUEST,
  DELETE_ACCOUNT_SOCIAL_REQUEST,
  GET_AUTOCOMPLETE_REQUEST,
  GET_AUTOCOMPLETE_SUCCESS,
  UPDATE_ACCOUNT_INFO_SUCCESS,
} from '../constants';

export const updateAvatar = payload => ({
  type: UPDATE_ACCOUNT_AVATAR_REQUEST,
  payload,
  meta: { thunk: true },
});

export const updateAvatarSuccess = ({ payload, meta }) => ({
  type: UPDATE_ACCOUNT_AVATAR_SUCCESS,
  payload,
  meta,
});

export const updateAccountInfo = payload => ({
  type: UPDATE_ACCOUNT_INFO_REQUEST,
  payload,
  meta: { thunk: true },
});

export const updateAccountInfoSuccess = ({ payload, meta }) => ({
  type: UPDATE_ACCOUNT_INFO_SUCCESS,
  payload,
  meta,
});

export const updatePassword = payload => ({
  type: UPDATE_ACCOUNT_PASSWORD_REQUEST,
  payload,
  meta: { thunk: true },
});

export const updatePasswordSuccess = ({ meta }) => ({
  type: UPDATE_ACCOUNT_PASSWORD_SUCCESS,
  meta,
});

export const connectSocial = payload => ({
  type: CONNECT_ACCOUNT_SOCIAL_REQUEST,
  payload,
});

export const deleteSocial = payload => ({
  type: DELETE_ACCOUNT_SOCIAL_REQUEST,
  payload,
});

export const getAutocomplete = payload => ({
  type: GET_AUTOCOMPLETE_REQUEST,
  payload,
  meta: { thunk: true },
});

export const getAutocompleteSuccess = ({ payload, meta }) => ({
  type: GET_AUTOCOMPLETE_SUCCESS,
  payload,
  meta,
});
