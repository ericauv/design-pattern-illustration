import { Action, Reducer } from 'redux';
import { ActionType as ObserverActionType, ObserverClass } from './observer-reducer';
// No Menu Open

MenuState = [];

// Subject's Top-Level Menu Open
// Register Observer
// Unregister Observer
// Notify Observers
// Delete Subject

interface IInteractWithObserver {
  subjectId: string;
  focus(observerId: string): void;
  selectObserver(observerId: string): void;
  back(): void;
}

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


interface IMenuState{
  subjectId:string;
  onObserverClickAction: ObserverActionType
}

// Initial State
export interface IInitialState {
  menuStateStack = IMenuState[];
}
export const initialState: IInitialState = {
  menuStateStack = []
};

export interface ISubjectContextMenuPayload {
  subjectId: string;
  observerId?: string;
}

// Action
export interface IDispatchAction extends Action {
  payload: ISubjectContextMenuPayload;
}

// Action Types
export enum ActionType {
  OPEN_SUBJECT_CONTEXT_MENU,
  BACK_SUBJECT_CONTEXT_MENU,
  CLOSE_SUBJECT_CONTEXT_MENU
}
// Reducers
export const subjectContextMenuReducer: Reducer<
  IInitialState,
  IDispatchAction
> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REGISTER_OBSERVER: {
      const { subjectId, observerId } = action.payload;
      const updatedSubject = copySubjectFromState(state, subjectId);
      const observerToAdd = copyObserverFromState(state, observerId);
      updatedSubject.observers[observerToAdd.id] = observerToAdd;
      const updatedSubjects = {
        ...state.subjects,
        [updatedSubject.id]: updatedSubject
      };
      return {
        ...state,
        subjects: updatedSubjects
      };
    }
    case ActionType.UNREGISTER_OBSERVER: {
      const { subjectId, observerId } = action.payload;
      const updatedSubject = copySubjectFromState(state, subjectId);
      const observerToUnregister = copyObserverFromState(state, observerId);
      delete updatedSubject.observers[observerToUnregister.id];
      const updatedSubjects = {
        ...state.subjects,
        [updatedSubject.id]: updatedSubject
      };
      return {
        ...state,
        subjects: updatedSubjects
      };
    }
    case ActionType.CREATE_OBSERVER: {
      const newObserver = new ObserverClass();
      const updatedObservers = { ...state.observers };
      updatedObservers[newObserver.id] = newObserver;
      return {
        ...state,
        observers: { ...updatedObservers }
      };
    }
    case ActionType.CREATE_SUBJECT: {
      const newSubject = new SubjectClass();
      const updatedSubjects = { ...state.subjects };
      updatedSubjects[newSubject.id] = newSubject;
      return {
        ...state,
        subjects: { ...updatedSubjects }
      };
    }
    case ActionType.DELETE_OBSERVER: {
      const { observerId } = action.payload;
      // Remove observer from all subjects so that subject doesn't try to notify a non-existant observer
      const updatedSubjects = unRegisterObserverFromAllSubjects(
        { ...state.subjects },
        action.payload.observerId
      );
      const updatedObservers = { ...state.observers };
      const observerToDelete = copyObserverFromState(state, observerId);
      delete updatedObservers[observerToDelete.id];
      return {
        ...state,
        observers: { ...updatedObservers },
        subjects: { ...updatedSubjects }
      };
    }
    case ActionType.DELETE_SUBJECT: {
      const { subjectId } = action.payload;
      const updatedSubjects = { ...state.subjects };
      const subjectToDelete = copySubjectFromState(state, subjectId);
      delete updatedSubjects[subjectToDelete.id];
      return {
        ...state,
        subjects: { ...updatedSubjects }
      };
    }

    case ActionType.SELECT_OBSERVER: {
      const { observerId } = action.payload;
      const observerToSelect = copyObserverFromState(state, observerId);

      return {
        ...state,
        selectedObserverId: observerToSelect.id
      };
    }
    case ActionType.SELECT_SUBJECT: {
      const { subjectId } = action.payload;
      const subjectToSelect = copySubjectFromState(state, subjectId);
      return {
        ...state,
        selectedSubjectId: subjectToSelect.id
      };
    }
    case ActionType.DESELECT_OBSERVER: {
      return {
        ...state,
        selectedObserverId: ''
      };
    }
    case ActionType.DESELECT_SUBJECT: {
      return {
        ...state,
        selectedSubjectId: ''
      };
    }
    default:
      return state;
  }
};

export const REGISTER_OBSERVER = (subjectId: string, observerId: string) => ({
  type: ActionType.REGISTER_OBSERVER,
  payload: { subjectId, observerId }
});
export const UNREGISTER_OBSERVER = (subjectId: string, observerId: string) => ({
  type: ActionType.UNREGISTER_OBSERVER,
  payload: { subjectId, observerId }
});
export const CREATE_OBSERVER = () => ({
  type: ActionType.CREATE_OBSERVER,
  payload: {}
});
export const CREATE_SUBJECT = () => ({
  type: ActionType.CREATE_SUBJECT,
  payload: {}
});
export const DELETE_OBSERVER = (observerId: string) => ({
  type: ActionType.DELETE_OBSERVER,
  payload: { observerId }
});
export const DELETE_SUBJECT = (subjectId: string) => ({
  type: ActionType.DELETE_SUBJECT,
  payload: { subjectId }
});
export const SELECT_OBSERVER = (observerId: string) => ({
  type: ActionType.SELECT_OBSERVER,
  payload: { observerId }
});
export const SELECT_SUBJECT = (subjectId: string) => ({
  type: ActionType.SELECT_SUBJECT,
  payload: { subjectId }
});
export const DESELECT_OBSERVER = () => ({
  type: ActionType.DESELECT_OBSERVER,
  payload: {}
});
export const DESELECT_SUBJECT = () => ({
  type: ActionType.DESELECT_SUBJECT,
  payload: {}
});
