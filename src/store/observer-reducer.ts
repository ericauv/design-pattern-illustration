import { Action, Reducer } from 'redux';

export interface IObserver {
  id: string;
  beingNotified: boolean;
}

export interface IDictionary<T> {
  [key: string]: T;
}

export class ObserverClass implements IObserver {
  id: string;
  beingNotified: boolean;
  constructor() {
    this.beingNotified = false;
    this.id = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
  }
}
export interface ISubject {
  id: string;
  observers: IDictionary<ObserverClass>;
}
export class SubjectClass implements ISubject {
  id: string;
  observers: IDictionary<ObserverClass>;
  constructor() {
    this.id = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
    this.observers = {};
  }
}

// Initial State
export interface IInitialState {
  subjects: IDictionary<SubjectClass>;
  observers: IDictionary<ObserverClass>;
  selectedSubjectId: string;
  selectedObserverId: string;
}
export const initialState: IInitialState = {
  subjects: {},
  observers: {},
  selectedSubjectId: '',
  selectedObserverId: ''
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
  REGISTER_OBSERVER = 'REGISTER_OBSERVER',
  UNREGISTER_OBSERVER = 'UNREGISTER_OBSERVER',
  CREATE_OBSERVER = 'CREATE_OBSERVER',
  CREATE_SUBJECT = 'CREATE_SUBJECT',
  DELETE_OBSERVER = 'DELETE_OBSERVER',
  DELETE_SUBJECT = 'DELETE_SUBJECT',
  SELECT_OBSERVER = 'SELECT_OBSERVER',
  SELECT_SUBJECT = 'SELECT_SUBJECT',
  DESELECT_OBSERVER = 'DESELECT_OBSERVER',
  DESELECT_SUBJECT = 'DESELECT_SUBJECT',
  NOTIFY_OBSERVERS = 'NOTIFY_OBSERVERS',
  UNNOTIFY_OBSERVERS = 'UNNOTIFY_OBSERVERS',
  TRY_NOTIFY_OBSERVERS = 'TRY_NOTIFY_OBSERVER'
}

function copySubjectFromState(
  state: IInitialState,
  subjectId: string
): ISubject {
  // returns a copy of the subject with passed subjectId if it exists in state
  if (!state.subjects.hasOwnProperty(subjectId)) {
    throw new Error(`Subject with id: ${subjectId} does not exist in state.`);
  }
  return {
    ...state.subjects[subjectId]
  };
}
function copyObserverFromState(
  state: IInitialState,
  observerId: string
): IObserver {
  if (!state.observers.hasOwnProperty(observerId)) {
    throw new Error(`Observer with id: ${observerId} does not exist in state.`);
  }
  return { ...state.observers[observerId] };
}
function unRegisterObserverFromAllSubjects(
  subjects: IDictionary<SubjectClass>,
  observerId: string
): IDictionary<SubjectClass> {
  const updatedSubjects = { ...subjects };
  for (const subject of Object.values(updatedSubjects)) {
    if (subject.observers.hasOwnProperty(observerId)) {
      delete subject.observers[observerId];
    }
  }
  return updatedSubjects;
}
function setObserversBeingNotified(
  state: IInitialState,
  subjectId: string,
  setToValue: boolean
): IDictionary<ObserverClass> {
  const allObservers = { ...state.observers };
  if (state.subjects[subjectId]) {
    const subject = state.subjects[subjectId];
    for (const observer in subject.observers) {
      if (allObservers.hasOwnProperty(observer)) {
        allObservers[observer].beingNotified = setToValue;
      }
    }
  }
  return allObservers;
}
// Reducers
export const observerReducer: Reducer<IInitialState, IDispatchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.NOTIFY_OBSERVERS: {
      const { subjectId } = action.payload;
      if (state.subjects[subjectId]) {
        // notify all observers of the subject
        const updatedObservers = setObserversBeingNotified(
          state,
          subjectId,
          true
        );
        console.log('NOTIFIED:', { ...state, observers: updatedObservers });

        return {
          ...state,
          observers: updatedObservers
        };
      } else {
        return { ...state };
      }
    }
    case ActionType.UNNOTIFY_OBSERVERS: {
      const { subjectId } = action.payload;
      if (state.subjects[subjectId]) {
        // notify all observers of the subject
        const updatedObservers = setObserversBeingNotified(
          state,
          subjectId,
          false
        );
        console.log('UNNOTIFIED:', { ...state, observers: updatedObservers });
        return {
          ...state,
          observers: updatedObservers
        };
      } else {
        return { ...state };
      }
    }
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

export const NOTIFY_OBSERVERS = (subjectId: string) => ({
  type: ActionType.NOTIFY_OBSERVERS,
  payload: { subjectId }
});

export const TRY_NOTIFY_OBSERVERS = (subjectId: string) => ({
  type: ActionType.TRY_NOTIFY_OBSERVERS,
  payload: { subjectId }
});
export const UNNOTIFY_OBSERVERS = (subjectId: string) => ({
  type: ActionType.UNNOTIFY_OBSERVERS,
  payload: { subjectId }
});

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
