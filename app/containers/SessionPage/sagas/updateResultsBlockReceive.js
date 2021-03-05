import { put, select } from 'redux-saga/effects';

import { updateBlockReceive, cloneContentReceive } from '../actions';

export default function* updateResultsBlockReceive({ stickers, ...block }) {
  yield put(updateBlockReceive(block));

  if (Array.isArray(stickers) && stickers.length) {
    const allContent = yield select((state) => state.session.content);
    const content = [];
    stickers.forEach((sticker) => {
      if (allContent.findIndex((c) => c.id === sticker.id) === -1) {
        content.push(sticker);
      }
    });

    if (content.length) {
      yield put(cloneContentReceive(content));
    }
  }
}
