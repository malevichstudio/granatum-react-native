import { put } from 'redux-saga/effects';

// import { convertContentIfExist } from 'utils/editor';
import {
  bulkCreateWidgetReceive,
  createBlockReceive as createBlockReceiveAction,
} from '../actions';
// import forceUpdateBlockLayout from './forceUpdateBlockLayout';

export default function* createBlockReceive(payload) {
  yield put(createBlockReceiveAction(payload));

  if (payload.widgets) {
    yield put(
      bulkCreateWidgetReceive(payload.widgets),
      // bulkCreateWidgetReceive(payload.widgets.map(convertContentIfExist)),
    );
  }

  // yield forceUpdateBlockLayout();
}
