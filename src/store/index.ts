import { IInitialState, IDispatchAction, rootReducer } from './root-reducer';
import { createStore } from 'redux';

export const store = createStore<IInitialState, IDispatchAction, null, null>(
  rootReducer
);
