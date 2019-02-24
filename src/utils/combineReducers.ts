import { Reducer, ReducerState, ReducerAction } from "react";

export interface ReducerCollection<S, A> {
  [key: string]: (state: S, action: A) => S;
}

/**
 * Typescript enables assurance at compile time that any reducers passed in as props on the reducers arg must be valid
 */
const combineReducers = <S, A>(reducers: ReducerCollection<S, A>) => {
  const reducerKeys = Object.keys(reducers);

  const appReducer = <R extends Reducer<any, any>>(appState: ReducerState<R>, action: ReducerAction<R>) => {
    let appStateHasChanged = false;
    let nextAppState = {} as ReducerState<R>;

    for (let i = 0; i < reducerKeys.length; i += 1) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const prevReducerState: S = appState[key];
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
