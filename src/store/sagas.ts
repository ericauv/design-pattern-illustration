import { put, delay, takeEvery } from 'redux-saga/effects';
import { IDispatchAction } from './observer-reducer';
import { ActionType } from './observer-reducer';

// worker Saga: will be fired on TRY_NOTIFY_OBSERVERS action
function* notifyObservers(action: IDispatchAction) {
  // Notify observers
  try {
    yield put({
      type: ActionType.NOTIFY_OBSERVERS,
      payload: { subjectId: action.payload.subjectId }
    });
    yield delay(500);
    yield put({
      type: ActionType.UNNOTIFY_OBSERVERS,
      payload: { subjectId: action.payload.subjectId }
    });
  } catch (e) {
    throw new Error('notifying observers failed :(');
  }
}

/*
  Starts notifyObservers on each dispatched `TRY_NOTIFY_OBSERVERS` action.
*/
function* notifyObserversSaga() {
  yield takeEvery(ActionType.TRY_NOTIFY_OBSERVERS, notifyObservers);
}

export default notifyObserversSaga;
