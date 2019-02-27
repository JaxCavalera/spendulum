import {
  CartSidebarReducerState,
  CartSidebarReducerAction,
  CartSidebarActionTypes,
} from './CartSidebar-models';

export const cartSidebarInitialState: CartSidebarReducerState = {
  cartItems: [],
  isSidebarOpen: false,
};

export const cartSidebarReducer = (
  state: CartSidebarReducerState,
  action: CartSidebarReducerAction,
): CartSidebarReducerState => {
  switch (action.type) {
    case CartSidebarActionTypes.UPDATE_IS_SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: action.isSidebarOpen,
      };

    case CartSidebarActionTypes.UPDATE_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};
