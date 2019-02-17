import {
  ProductFilterReducerState,
  ProductFilterReducerAction,
  ProductFilterActionTypes,
} from './ProductFilter-models';

export const productFilterActionTypes: ProductFilterActionTypes = {};

export const productFilterInitialState: ProductFilterReducerState = {};

export const productFilterReducer = (state: ProductFilterReducerState, action: ProductFilterReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
