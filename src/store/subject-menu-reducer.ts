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
  subjectId: string;
  menuStack: MenuType[];
}

export const initialState: ISubjectMenuInitialState = {
  subjectId: '',
  menuStack: []
};

export interface ISubjectMenuPayload {
  menuType: MenuType;
  subjectId: string;
}

// Action
export interface IDispatchAction extends Action {
  payload: ISubjectMenuPayload;
}

// Action Types
export enum ActionType {
  OPEN_SUBJECT_MENU,
  BACK_SUBJECT_MENU,
  CLOSE_SUBJECT_MENU,
  UPDATE_SUBJECT_MENU
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
        subjectId: action.payload.subjectId,
        menuStack: [MenuType.SubjectTopMenu]
      };
    }
    case ActionType.BACK_SUBJECT_MENU: {
      const updatedMenuStack = [...state.menuStack];
      updatedMenuStack.pop();
      return {
        ...state,
        menuStack: [...updatedMenuStack]
      };
    }
    case ActionType.CLOSE_SUBJECT_MENU: {
      return {
        ...state,
        subjectId: '',
        menuStack: []
      };
    }
    case ActionType.UPDATE_SUBJECT_MENU: {
      return {
        ...state,
        menuStack: [...state.menuStack, action.payload.menuType]
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

export const BACK_SUBJECT_MENU = () => ({
  type: ActionType.BACK_SUBJECT_MENU,
  payload: {}
});
export const CLOSE_SUBJECT_MENU = () => ({
  type: ActionType.CLOSE_SUBJECT_MENU,
  payload: {}
});
export const UPDATE_SUBJECT_MENU = (
  subjectId: string,
  newMenuType: MenuType
) => ({
  type: ActionType.UPDATE_SUBJECT_MENU,
  payload: { subjectId, newMenuType }
});

// TODO!!!!!!!!!!

// Actions for different ActionType DONE
// Reducers for new actions DONE
// Corresponding dispatch on subject right click, etc. DONE
// Refactor SubjectMenu to hold list container, and render different list items for different MenuStates, rather than different components
// Create Sub Menu Components fully
// Clean up observer-reducer ... DON"T KEEP OBSERVERS AS CHILDREN OF SUBJECTS, just observerIds
// Css to make it look *pretty sweet*
