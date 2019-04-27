import { Reducer, ReducerState, ReducerAction } from 'react';

// Constrains the reducer method shapes.
// Treats the return type Param on left side as a generic for use on the right
type ReducerCollection<ReducerMethod> = {
  [StateParam in keyof ReducerMethod]: (
    state: ReducerMethod[StateParam],
    action: any,
  ) => ReducerMethod[StateParam];
}

// Binds each reducer to a generic for use when extracting params out in the ReducerCollection type
export const validateReducers = <ReducerMethod>(
  reducers: ReducerCollection<ReducerMethod>,
) => reducers;

// combineReducers expects a collection of previously validated ReducerMethods as the argument
interface ValidReducers {
  [key: string]: Reducer<any, any>;
}


/**
 * Used to convert a collection of reducer methods into function that
 * can call each of them with the same ReducerAction
 * until it gets a match resulting in new appState.
 *
 * Did not include additional safeguards that confirm each reducer never
 * returns things like undefined if no action is matched
 * to better align with the new React implementation of reducers that are more liberal.
 */
export const combineReducers = (reducers: ValidReducers) => {
  // known eslint issue - expecting fix in next published version
  /* eslint-disable arrow-parens */
  const appReducer = <R extends Reducer<any, any>>(
    appState: ReducerState<R>,
    action: ReducerAction<R>,
  ) => {
    /* eslint-enable arrow-parens */
    const reducerKeys = Object.keys(reducers);
    let appStateHasChanged = false;
    const nextAppState = {} as ReducerState<R>;

    // Using for loop vs recursion or Array.prototype.reduce to gain improved performance
    for (let i = 0; i < reducerKeys.length; i += 1) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const prevReducerState = appState[key];
      const nextReducerState = reducer(prevReducerState, action);

      appStateHasChanged = appStateHasChanged || prevReducerState !== nextReducerState;

      // Build up the nextAppState object returned if the provided action results in change
      nextAppState[key] = nextReducerState;
    }

    return appStateHasChanged ? nextAppState : appState;
  };

  return appReducer;
};
