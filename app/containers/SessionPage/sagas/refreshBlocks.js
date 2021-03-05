import { call, put } from 'redux-saga/effects';

import { flushBlocks } from '../actions';
import getBlocks from './getBlocks';

export default function* refreshBlocks() {
  // сначала очищаем старые блоки, иначе у нас изменения по layout'у в стикерах
  // не отработают (допустим в блоке ответов)
  yield put(flushBlocks());
  yield call(getBlocks);
}
