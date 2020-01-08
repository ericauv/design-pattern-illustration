import {
  IInitialState,
  IDispatchAction,
  observerReducer
} from './observer-reducer';
import { createStore } from 'redux';

export const store = createStore<IInitialState, IDispatchAction, null, null>(
  observerReducer
);
