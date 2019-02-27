import { ProductInfo } from '../ProductCard/ProductCard-models';

export enum CartSidebarActionTypes {
  UPDATE_CART_ITEMS = 'cartSidebar/UPDATE_CART_ITEMS',
  UPDATE_IS_SIDEBAR_OPEN = 'cartSidebar/UPDATE_IS_SIDEBAR_OPEN',
};

export interface CartSidebarReducerAction {
  type: string;
  cartItems: ProductInfo[];
  isSidebarOpen: boolean;
}

export interface CartSidebarReducerState {
  cartItems: ProductInfo[];
  isSidebarOpen: boolean;
}
