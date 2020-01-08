import { Action, Reducer } from 'redux';

export interface IObserver {
  id: string;
  notify(): void;
}

export interface IDictionary<T> {
  [key: string]: T;
}

class Observer implements IObserver {
  id: string;
  constructor() {
    this.id = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
  }
  notify() {
    console.log(`Observer: ${this.id} -- NOTIFIED`);
  }
}
export interface ISubject {
  id: string;
  observers: IDictionary<IObserver>;
  notifyObservers(): void;
}
class Subject implements ISubject {
  id: string;
  observers: IDictionary<IObserver>;

  constructor() {
    this.id = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
    this.observers = {};
  }
  notifyObservers() {
    for (const observer of Object.values(this.observers) {
      observer.notify();
    }
  }
}

// Initial State
export interface IInitialState {
  subjects: IDictionary<ISubject>;
  observers: IDictionary<IObserver>;
}
export const initialState: IInitialState = {
  subjects: {},
  observers: {}
};

export interface IObserverPayload {
  subjectId: string;
  observerId: string;
}

// Action
export interface IDispatchAction extends Action {
  payload: IObserverPayload;
}

// Action Types
export enum ActionType {
  REGISTER_OBSERVER,
  UNREGISTER_OBSERVER,
  CREATE_OBSERVER,
  CREATE_SUBJECT,
  DELETE_OBSERVER,
  DELETE_SUBJECT
}

// Reducers
export const observerReducer: Reducer<IInitialState, IDispatchAction> = (
  state = initialState,
  action
) => {

  function unRegisterObserverFromAllSubjects(
    subjects: IDictionary<ISubject>,
    observerId: string
  ): IDictionary<ISubject> {
    const updatedSubjects = { ...subjects };
    for (const subject of Object.values(updatedSubjects)) {
      if (subject.observers.hasOwnProperty(observerId)) {
        delete subject.observers[observerId];
      }
    }
    return updatedSubjects;
  }

  function copySubjectFromState(subjectId:string):ISubject {
    // returns a copy of the subject with passed subjectId if it exists in state
    if(!state.subjects.hasOwnProperty(subjectId)){
      throw new Error(`Subject with id: ${subjectId} does not exist in state.`);
    }
    return {...state.subjects[subjectId]}
  }
  function copyObserverFromState(observerId:string):IObserver {
    if(!state.observers.hasOwnProperty(observerId)){
      throw new Error(`Observer with id: ${observerId} does not exist in state.`);
    }
    return {...state.observers[observerId]}
  }

  const {subjectId, observerId} = action.payload;
  switch (action.type) {
    case ActionType.REGISTER_OBSERVER: {
      const updatedSubject = copySubjectFromState(subjectId);
      const observerToAdd = copyObserverFromState(observerId);
      updatedSubject.observers[observerToAdd.id] = observerToAdd;
      const updatedSubjects = {...state.subjects, [updatedSubject.id]: updatedSubject};
      return {
        ...state,
        subjects: updatedSubjects
      };
    }
    case ActionType.UNREGISTER_OBSERVER: {
      const updatedSubject = copySubjectFromState(subjectId);
      const observerToUnregister = copyObserverFromState(observerId);
      delete updatedSubject.observers[observerToUnregister.id]
      const updatedSubjects = {...state.subjects, [updatedSubject.id]: updatedSubject};
      return {
        ...state,
        subjects: updatedSubjects
      };
    }
    case ActionType.CREATE_OBSERVER: {
      const newObserver = new Observer();
      const updatedObservers = {...state.observers};
      updatedObservers[newObserver.id] = newObserver;
      return {
        ...state,
        observers: {...updatedObservers}
      };
    }
    case ActionType.CREATE_SUBJECT: {
      const newSubject = new Subject();
      const updatedSubjects = {...state.subjects};
      updatedSubjects[newSubject.id] = newSubject;
      return {
        ...state,
        subjects: {...updatedSubjects}
      };
    }
    case ActionType.DELETE_OBSERVER: {
      // Remove observer from all subjects so that subject doesn't try to notify a non-existant observer
      const updatedSubjects = unRegisterObserverFromAllSubjects(
        {...state.subjects},
        action.payload.observerId
      );
      const updatedObservers = {...state.observers};
      const observerToDelete = copyObserverFromState(observerId);
      delete updatedObservers[observerToDelete.id];
      return {
        ...state,
        observers: {...updatedObservers},
        subjects: {...updatedSubjects}
      };
    }
    case ActionType.DELETE_SUBJECT: {
      const updatedSubjects = {...state.subjects};
      const subjectToDelete = copySubjectFromState(subjectId);
      delete updatedSubjects[subjectToDelete.id]
      return {
        ...state,
        subjects: {...updatedSubjects}
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
export const UNREGISTER_OBSERVER = (
  subjectId: string,
  observerId: string
) => ({
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
