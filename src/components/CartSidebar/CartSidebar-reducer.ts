import {
  CartSidebarReducerState,
  CartSidebarReducerAction,
  CartSidebarActionTypes,
} from './CartSidebar-models';

export const cartSidebarInitialState: CartSidebarReducerState = {
  cartItemMicroStoreIds: [],
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

    case CartSidebarActionTypes.UPDATE_CART_ITEM_MICROSTORE_ID_LIST: {
      return {
        ...state,
        ...action.cartItemMicroStoreIds && {
          cartItemMicroStoreIds: action.cartItemMicroStoreIds,
        },
      };
    }

    case CartSidebarActionTypes.ASSIGN_MICROSTORE: {
      const { cartItemMicroStoreId, cartItemData } = action;
      return {
        ...state,
        ...cartItemMicroStoreId && cartItemData && {
          [cartItemMicroStoreId]: cartItemData,
        },
      };
    }

    case CartSidebarActionTypes.REMOVE_MICROSTORE: {
      const { cartItemMicroStoreId } = action;

      if (!cartItemMicroStoreId) {
        // Nothing to remove
        return state;
      }

      const { [cartItemMicroStoreId]: removedMicroStore, ...newState } = state;
      return newState as CartSidebarReducerState;
    }

    case CartSidebarActionTypes.UPDATE_MICROSTORE_VALUE: {
      const {
        cartItemMicroStoreId,
        microStoreProperty,
        microStorePropertyValue,
      } = action;

      if (!cartItemMicroStoreId || !state[cartItemMicroStoreId]) {
        // No matching microstore to update
        return state;
      }

      return {
        ...state,
        [cartItemMicroStoreId]: {
          ...state[cartItemMicroStoreId],
          ...microStoreProperty && {
            [microStoreProperty]: microStorePropertyValue,
          },
        },
      };
    }

    default:
      return state;
  }
};
