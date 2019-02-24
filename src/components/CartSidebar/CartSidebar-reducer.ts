import {
  CartSidebarReducerState,
  CartSidebarReducerAction,
  CartSidebarActionTypes,
} from './CartSidebar-models';

export const cartSidebarInitialState: CartSidebarReducerState = {};

export const cartSidebarReducer = (
  state: CartSidebarReducerState = cartSidebarInitialState,
  action: CartSidebarReducerAction,
): CartSidebarReducerState => {
  switch (action.type) {

    default:
      return state;
  }
};
