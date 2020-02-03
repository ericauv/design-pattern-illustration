import {
  IInitialState,
  IDispatchAction,
  observerReducer
} from './observer-reducer';
import { subjectMenuReducer } from './subject-menu-reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import notifyObserversSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ observerReducer, subjectMenuReducer });
export function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(notifyObserversSaga);
  return store;
}
