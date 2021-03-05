import { put } from 'redux-saga/effects';

import { createThemeReceive as createThemeReceiveAction } from '../actions';

export default function* createThemeReceive(payload) {
  yield put(
    createThemeReceiveAction({
      id: payload.id,
      palette: {
        colorOne: payload.colorOne,
        colorTwo: payload.colorTwo,
        colorThree: payload.colorThree,
        colorFour: payload.colorFour,
        colorFive: payload.colorFive,
      },
    }),
  );
}
