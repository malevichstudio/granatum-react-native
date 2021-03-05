/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';

import createReducer from './reducers';

let store = null;
// this is sagaMonitor for cases when we need to debug strange sagas behaviour
const sagaMiddleware = createSagaMiddleware(/* {
  sagaMonitor: {
    rootSagaStarted: ({ effectId, saga, args }) => {
      console.log('✅  event rootSaga started:', { effectId, saga, args });
    },
    effectCancelled: effectId => {
      console.log('✅ ️ cancelled:', effectId);
    },
    effectRejected: (effectId, error) => {
      console.log('✅ ️ rejected:', effectId);
      console.error('✅ ️ rejected error:', error);
    },
    effectResolved: (effectId, result) => {
      console.log('✅ ️ resolved:', effectId);
      if (result) {
        console.log('️✅  resolved result:', result);
      }
    },
    effectTriggered: ({ effectId, parentEffectId, label, effect }) => {
      console.log('✅ ️ triggered:', {
        effectId,
        parentEffectId,
        label,
        effect,
      });
    },
    actionDispatched: action => {
      console.log('✅ ️ action dispatched:', action);
    },
  },
} */);

// 'sagaMiddleware' should be registered as middleware in 'createStore'
// otherwise you have no access to store
// @see: https://github.com/redux-saga/redux-saga/issues/907#issuecomment-365677030
export function execute(saga, ...args) {
  return sagaMiddleware.run(saga, ...args).done;
}

// This can be used for classes
// @see: https://github.com/redux-saga/redux-saga/issues/907#issuecomment-446174871
export function bindToSaga(fn) {
  return (...args) => sagaMiddleware.run(fn, ...args).done;
}

export default function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  // const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  // const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunkMiddleware, sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}

export { store };
