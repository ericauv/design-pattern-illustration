import {
  IInitialState,
  IDispatchAction,
  observerReducer
} from './observer-reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import notifyObserversSaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

export function configureStore(){
  const store = createStore(
    observerReducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(notifyObserversSaga);
  return store;
}
