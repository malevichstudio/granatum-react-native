import { call, put } from 'redux-saga/effects';

import requestSaga from 'app/utils/api/requestSaga';
import { api } from 'app/config';
import { getAutocompleteSuccess } from '../actions';
import { GET_AUTOCOMPLETE_FAILURE } from '../constants';

export default function* getAutocomplete({ payload, meta }) {
  const data = yield call(
    requestSaga,
    api.endpoints[`accountAutocomplete${payload.provider}`].get,
    GET_AUTOCOMPLETE_FAILURE,
    {
      query: payload.query,
    },
    meta,
  );

  if (!data || data.error) {
    return;
  }

  yield put(getAutocompleteSuccess({ payload: data, meta }));
}
