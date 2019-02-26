import { ProductInfo } from '../ProductCard/ProductCard-models';

export enum CartSidebarActionTypes {
  UPDATE_CART_ITEMS = 'cartSidebar/UPDATE_CART_ITEMS',
};

export interface CartSidebarReducerAction {
  type: string;
  cartItems: ProductInfo[];
}

export interface CartSidebarReducerState {
  cartItems: ProductInfo[];
}
