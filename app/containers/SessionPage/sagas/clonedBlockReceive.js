import { put } from 'redux-saga/effects';

import {
  updateBlockReceive,
  cloneContentReceive,
  cloneWidgetsReceive,
} from '../actions';

// TODO с этой сагой есть баг. Вернее с логикой обновления виджетов в блоке ответов
//  useResizeObserver не везде адекватно отлавливает приход новых виджетов.
//  Было испробовано с десяток разных версий (смотри историю коммитов), но всегда
//  ситуация повторяется: локально обсёрвер нормально срабатыает, на окружении
//  всегда не срабатывает.
export default function* clonedBlockReceive(block) {
  const { widgets, ...rest } = block;

  yield put(updateBlockReceive(rest));

  let content = [];
  const cleanWidgets = widgets.map((widget) => {
    const { stickers, ...restWidget } = widget;
    if (Array.isArray(stickers)) {
      content = content.concat(stickers);
    }
    return restWidget;
  });

  if (content.length) {
    yield put(cloneContentReceive(content));
  }
  if (cleanWidgets.length) {
    yield put(cloneWidgetsReceive(cleanWidgets));
  }
}
