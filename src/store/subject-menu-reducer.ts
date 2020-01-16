import { Action, Reducer } from 'redux';
import { ActionType as ObserverActionType } from './observer-reducer';
// No Menu Open

// Register Observer Menu Open
// 1. Selecting Observer
// Observer Selected
// Valid selection -> RegisterObserver
// Invalid selection
// 2. Unregister Observer?
// 2a. Yes -> UnregisterObserver
// 2b. No -> 1. Selecting Observer

// Back -> pop MenuState[]

// Unregister Observer Menu Open
// 1. Selecting Observer
// Observer Selected
// Valid selection -> UnregisterObserver
// Invalid selection
// 2. Register Observer?
// 2a. Yes -> RegisterObserver
// 2b. No -> 1. Selecting Observer
// Back -> pop MenuState[]

// initial state
export interface ISubjectMenuInitialState {
  menuStack: MenuType[];
}

export const initialState: ISubjectMenuInitialState = {
  menuStack: []
};

export interface ISubjectMenuPayload {
  menuType: MenuType;
}

// Action
export interface IDispatchAction extends Action {
  payload: ISubjectMenuPayload;
}

// Action Types
export enum ActionType {
  /* Need type for OPEN_MENU
  for saga to close all other menus
  and clear menuStack */
  OPEN_SUBJECT_MENU,
  BACK_SUBJECT_MENU,
  CLOSE_SUBJECT_MENU,
  NAVIGATE_SUBJECT_MENU
}

export enum MenuType {
  SubjectTopMenu = 'SubjectTopMenu',
  SubjectRegisterObserverMenu = 'SubjectRegisterObserverMenu',
  SubjectUnregisterObserverMenu = 'SubjectUnregisterObserverMenu'
}
// Reducers
export const subjectMenuReducer: Reducer<
  ISubjectMenuInitialState,
  IDispatchAction
> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.OPEN_SUBJECT_MENU: {
      return {
        ...state,
        menuStack: [...state.menuStack, MenuType.SubjectRegisterObserverMenu]
      };
    }
    default:
      return state;
  }
};

export const OPEN_SUBJECT_MENU = (subjectId: string) => ({
  type: ActionType.OPEN_SUBJECT_MENU,
  payload: { subjectId }
});
