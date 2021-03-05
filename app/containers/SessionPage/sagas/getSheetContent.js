import { call, put, select } from 'redux-saga/effects';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { api } from '../../../config';
import requestSaga from '../../../utils/api/requestSaga';
import { chunkArray } from '../../../utils/arrays';
import { getSheetContentSuccess } from '../actions';
import { GET_SHEET_USERS_CONTENT_FAILURE } from '../constants';
import { selectActiveSheetId, selectSelectedTeamIds } from '../selectors';

function getTeamId(ids) {
  if (Array.isArray(ids)) {
    if (ids.length === 1) {
      return ids[0];
    }
  }
  return null;
}

/**
 * Fetch all available users content for active sheet
 * @return {IterableIterator<*>}
 */
export default function* getSheetContent() {
  const sheetId = yield select(selectActiveSheetId);
  // Если у админа выбрана какая-то одна команда, то он должен получать контент
  // только по этой команде. Этот массив содержит либо один id, либо несколько.
  // В случае, если один, это значит, что выбрана одна команда
  const teamIds = yield select(selectSelectedTeamIds);
  const teamId = getTeamId(teamIds);

  const query = typeof teamId === 'string' ? { query: { teamId } } : {};
  const data = yield call(
    requestSaga,
    api.endpoints.constructorSheetsContent.get,
    GET_SHEET_USERS_CONTENT_FAILURE,
    { id: sheetId, ...query },
  );

  // исправлено по наводке bugsnag
  if (!data || typeof data.error === 'string') {
    return;
  }

  // Если стикеров больше ХХ, то мы разбиваем их по ХХ штук и добавляем в стейт
  // пачками, чтобы браузер не умер
  if (data.length > 50) {
    const chunkedData = chunkArray(data, 50);
    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }
    for (let i = 0; i < chunkedData.length; i += 1) {
      yield put(getSheetContentSuccess(chunkedData[i]));
      const delay = (time) =>
        new Promise((resolve) => BackgroundTimer.setTimeout(resolve, time));
      yield call(delay, 200);
    }
    if (Platform.OS === 'ios') {
      BackgroundTimer.stop();
    }
  } else {
    yield put(getSheetContentSuccess(data));
  }
}
