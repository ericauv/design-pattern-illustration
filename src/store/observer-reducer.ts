import { Action, Reducer } from 'redux';

export interface IObserver {
  id: string;
  notify(): void;
}

class ObserverInstance implements IObserver {
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
class SubjectInstance implements ISubject {
  id: string;
  observers: IObserver[];
  constructor() {
    this.id = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
    this.observers = [];
  }
}

export interface ISubject {
  id: string;
  observers: IObserver[];
}

// Initial State
export interface IInitialState {
  subjects: ISubject[];
  observers: IObserver[];
  subjectCounter: number;
  observerCounter: number;
}
export const initialState: IInitialState = {
  subjects: [],
  observers: [],
  subjectCounter: 0,
  observerCounter: 0
};

export interface IObserverPayload {
  subject: ISubject;
  observer: IObserver;
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
  function getSubjectIndex(state: IInitialState, subject: ISubject): number {
    return state.subjects.indexOf(subject);
  }
  function getObserverIndex(subject: ISubject, observer: IObserver): number {
    return subject.observers.indexOf(observer);
  }
  function unRegisterObserverFromAllSubjects(
    subjects: ISubject[],
    observer: IObserver
  ): ISubject[] {
    return subjects.map((subjectItem, index) => {
      // find index of observer to remove in the current subjectItem
      const observerIndex = subjectItem.observers.findIndex(
        observerItem => observerItem.id === observer.id
      );
      if (observerIndex >= 0) {
        // remove the observer from this subject's observers
        subjectItem.observers.splice(observerIndex, 1);
        return subjectItem;
      } else {
        return subjectItem;
      }
    });
  }
  switch (action.type) {
    case ActionType.REGISTER_OBSERVER: {
      // Find subject
      const subjectIndex = getSubjectIndex(state, action.payload.subject);
      const newSubjects = state.subjects.map((subjectItem, index) => {
        // do nothing if current subjectItem is not the subject to be updated
        if (index !== subjectIndex) {
          return subjectItem;
        } else {
          // add observer to observers list of the subject
          subjectItem.observers.push(action.payload.observer);
          return subjectItem;
        }
      });
      if (subjectIndex >= 0) {
        return {
          ...state,
          subjects: [...newSubjects]
        };
      } else {
        throw new Error('Subject did not exist in state');
      }
    }
    case ActionType.UNREGISTER_OBSERVER: {
      // Find subject
      const subjectIndex = getSubjectIndex(state, action.payload.subject);
      if (subjectIndex >= 0) {
        const newSubjects = state.subjects.map((subjectItem, index) => {
          // do nothing if current subjectItem is not the subject to be updated
          if (index !== subjectIndex) {
            return subjectItem;
          } else {
            const observerIndex = getObserverIndex(
              subjectItem,
              action.payload.observer
            );
            if (observerIndex >= 0) {
              // remove observer from observers list of the subject
              subjectItem.observers.splice(observerIndex, 1);
            } else {
              throw new Error(
                "Observer was not an element of the Subject's observers"
              );
            }
            return subjectItem;
          }
        });
        return {
          ...state,
          subjects: [...newSubjects]
        };
      } else {
        throw new Error('Subject did not exist in state');
      }
    }
    case ActionType.CREATE_OBSERVER: {
      const newObservers = [...state.observers];
      newObservers.push(new ObserverInstance());
      return {
        ...state,
        observers: [...newObservers],
        observerCounter: state.observerCounter + 1
      };
    }
    case ActionType.CREATE_SUBJECT: {
      const newSubjects = [...state.subjects];
      newSubjects.push(new SubjectInstance());
      return {
        ...state,
        subjects: [...newSubjects]
      };
    }
    case ActionType.DELETE_OBSERVER: {
      // Remove observer from all subjects so that subject doesn't try to notify a non-existant observer
      const newSubjects = unRegisterObserverFromAllSubjects(
        [...state.subjects],
        action.payload.observer
      );
      const observerIndex = state.observers.indexOf(action.payload.observer);
      if (observerIndex < 0) {
        throw new Error('Observer did not exist in state');
      }
      const newObservers = [...state.observers];
      // Remove observer from state.observers
      newObservers.splice(observerIndex, 1);
      return {
        ...state,
        observers: [...newObservers],
        subjects: [...newSubjects]
      };
    }
    case ActionType.DELETE_SUBJECT: {
      const subjectIndex = getSubjectIndex(state, action.payload.subject);
      if (subjectIndex < 0) {
        throw new Error('Subject did not exist in state');
      }
      const newSubjects = [...state.subjects].splice(subjectIndex, 1);
      return {
        ...state,
        subjects: [...newSubjects]
      };
    }
    default:
      return state;
  }
};

export const REGISTER_OBSERVER = (subject: ISubject, observer: IObserver) => ({
  type: ActionType.REGISTER_OBSERVER,
  payload: { subject, observer }
});
export const UNREGISTER_OBSERVER = (
  subject: ISubject,
  observer: IObserver
) => ({
  type: ActionType.UNREGISTER_OBSERVER,
  payload: { subject, observer }
});
export const CREATE_OBSERVER = () => ({
  type: ActionType.CREATE_OBSERVER,
  payload: {}
});
export const CREATE_SUBJECT = () => ({
  type: ActionType.CREATE_SUBJECT,
  payload: {}
});
export const DELETE_OBSERVER = (observer: IObserver) => ({
  type: ActionType.DELETE_OBSERVER,
  payload: { observer }
});
export const DELETE_SUBJECT = (subject: ISubject) => ({
  type: ActionType.DELETE_SUBJECT,
  payload: { subject }
});
