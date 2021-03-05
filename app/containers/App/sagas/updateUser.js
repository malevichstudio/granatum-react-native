import { call, select } from 'redux-saga/effects';

import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';
import { UPDATE_USER_FAILURE } from '../constants';
import { selectUser } from '../selectors';
import { navigate } from 'app/utils/RootNavigation';

export default function* updateUser({ lang }) {
  const user = yield select(selectUser);
  if (user.id) {
    yield call(requestSaga, api.endpoints.account.patch, UPDATE_USER_FAILURE, {
      lang,
    });
    navigate('LanguagePage');
  }
}
