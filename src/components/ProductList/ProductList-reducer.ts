import {
  ProductListReducerState,
  ProductListReducerAction,
  ProductListActionTypes,
} from './ProductList-models';

export const productListActionTypes: ProductListActionTypes = {};

export const productListInitialState: ProductListReducerState = {};

export const productListReducer = (state: ProductListReducerState, action: ProductListReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
