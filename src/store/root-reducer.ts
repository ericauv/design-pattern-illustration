import { Action, Reducer } from 'redux';

export interface IRecord {
  name: string;
  address: string;
}

// Initial State
export interface IInitialState {
  name: string;
  address: string;
  record: IRecord;
  records: IRecord[];
}
export const initialState: IInitialState = {
  name: '',
  address: '',
  record: { name: '', address: '' },
  records: []
};

// Action
export interface IDispatchAction extends Action {
  payload: IInitialState;
}

// Action Types
export enum ActionType {
  UpdateName,
  UpdateAddress,
  AddRecord
}

// Reducers
export const rootReducer: Reducer<IInitialState, IDispatchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.UpdateName:
      return { ...state, name: action.payload.name || '' };
    case ActionType.UpdateAddress:
      return { ...state, address: action.payload.address || '' };
    case ActionType.AddRecord:
      return {
        ...state,
        records: [...state.records, action.payload.record]
      };
    default:
      return state;
  }
};

export const updateName = (name: string) => ({
  type: ActionType.UpdateName,
  payload: { name }
});

export const updateAddress = (address: string) => ({
  type: ActionType.UpdateAddress,
  payload: { address }
});

export const addRecord = (record: IRecord) => ({
  type: ActionType.AddRecord,
  payload: { record }
});
