import {
  CartItemReducerState,
  CartItemReducerAction,
  CartItemActionTypes,
} from './CartItem-models';

export const cartItemActionTypes: CartItemActionTypes = {};

export const cartItemInitialState: CartItemReducerState = {};

export const cartItemReducer = (state: CartItemReducerState, action: CartItemReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
