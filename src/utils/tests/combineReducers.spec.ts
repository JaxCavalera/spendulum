import { combineReducers } from '../combineReducers';

// Mocks
import {
  validReducerCollection,
  reducerOne,
  reducerTwo,
  ReducerOneActionTypes,
  ReducerTwoActionTypes,
  initialAppState,
} from './combineReducers-mocks';

// combineReducers
describe('Given combineReducers is called with a collection of reducer functions', () => {
  describe('When all reducer functions are valid', () => {
    test('Then it will return a new reducer that runs each nested reducer in the original collection when called', () => {
      const mockedReducerCollection = {
        reducerOne: jest.fn(reducerOne),
        reducerTwo: jest.fn(reducerTwo),
      };

      const newReducer = combineReducers(mockedReducerCollection);

      // Call the new reducer with some state and action
      newReducer(initialAppState, { type: ReducerOneActionTypes.UPDATE_IS_VALID, isValid: true });

      expect(mockedReducerCollection.reducerOne).toHaveBeenCalledTimes(1);
      expect(mockedReducerCollection.reducerTwo).toHaveBeenCalledTimes(1);
    });
  });

  describe('When a combined reducer is called with an action that only matches one of the nested reducers', () => {
    test('Then only the affected reducer state will be updated', () => {
      const newReducer = combineReducers(validReducerCollection);

      const finalAppState: typeof initialAppState = {
        reducerOne: {
          isValid: false,
        },
        reducerTwo: {
          isValid: true,
        },
      };

      // Extract the reduced state produced by calling the combined reducer with a handled actionType
      const reducedState = newReducer(initialAppState, { type: ReducerTwoActionTypes.UPDATE_IS_VALID, isValid: true });

      expect(reducedState).toEqual(finalAppState);
    });
  });

  describe('When a combined reducer is called with an action that does not match any nested reducers', () => {
    test('Then the combined reducer will return the unaltered initialAppState', () => {
      const newReducer = combineReducers(validReducerCollection);

      // Extract the reduced state produced by calling the combined reducer with an unknown actionType
      const reducedState = newReducer(initialAppState, { type: 'NOT_GOING_TO_MATCH', isValid: true });

      expect(reducedState).toEqual(initialAppState);
    });
  });
});
