import { Reducer, ReducerState, ReducerAction } from "react";

// Enforces that each method abides by the specified shape. Treats the return type Param on left side as a generic for use on the right
type ReducerCollection<ReducerMethod> = {
  [StateParam in keyof ReducerMethod]: (state: ReducerMethod[StateParam], action: any) => ReducerMethod[StateParam];
}

// Binds each reducer to a generic for use when extracting params out in the ReducerCollection type
export const validateReducers = <ReducerMethod>(reducers: ReducerCollection<ReducerMethod>) => reducers;

// Expects combineReducers to only be called with a collection of previously validated reducer methods
interface ValidReducers {
  [key: string]: Reducer<any, any>;
}

/**
 * Used to convert a collection of reducer methods into function that can call each of them with the same ReducerAction
 * until it gets a match resulting in new appState.
 * 
 * Did not include additional safeguards that confirm each reducer never returns things like undefined if no action is matched
 * to better align with the new React implementation of reducers that are more liberal.
 */
export const combineReducers = (reducers: ValidReducers) => {
  // Function expression enables easier type annotations + ability to debug prior to the appReducer fn being returned if needed
  const appReducer = <R extends Reducer<any, any>>(appState: ReducerState<R>, action: ReducerAction<R>) => {
    const reducerKeys = Object.keys(reducers);
    let appStateHasChanged = false;
    let nextAppState = {} as ReducerState<R>;

    // Using for loop vs recursion or Array.prototype.reduce to gain improved performance
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
