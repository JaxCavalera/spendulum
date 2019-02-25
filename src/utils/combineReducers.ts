import { Reducer, ReducerState, ReducerAction } from "react";

// Enforces that each method abides by the specified shape. Only extracts return type Param on left side for use on right
type ReducerCollection<ReducerMethod> = {
  [StateParam in keyof ReducerMethod]: (state: ReducerMethod[StateParam], action: any) => ReducerMethod[StateParam];
}

// Binds each reducer to a generic for use when extracting params out in the ReducerCollection type
export const validateReducers = <ReducerMethod>(reducers: ReducerCollection<ReducerMethod>) => reducers;

// Expects combineReducers to only be called with a collection of previously validated reducer methods
interface ValidReducers {
  [key: string]: Reducer<any, any>;
}

const combineReducers = (reducers: ValidReducers) => {
  const reducerKeys = Object.keys(reducers);

  const appReducer = <R extends Reducer<any, any>>(appState: ReducerState<R>, action: ReducerAction<R>) => {
    let appStateHasChanged = false;
    let nextAppState = {} as ReducerState<R>;

    for (let i = 0; i < reducerKeys.length; i += 1) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const prevReducerState = appState[key];
      const nextReducerState = reducer(prevReducerState, action);

      appStateHasChanged = appStateHasChanged || prevReducerState !== nextReducerState;

      // Build up the nextAppState object incase part of the app's state has been changed by the provided action
      nextAppState[key] = nextReducerState;
    }

    return appStateHasChanged ? nextAppState : appState;
  };

  return appReducer;
};

export default combineReducers;
