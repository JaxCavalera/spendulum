import { ProductInfo } from '../../utils/product-info-helpers';

export enum CartSidebarActionTypes {
  UPDATE_CART_ITEMS = 'cartSidebar/UPDATE_CART_ITEMS',
  UPDATE_IS_SIDEBAR_OPEN = 'cartSidebar/UPDATE_IS_SIDEBAR_OPEN',
  UPDATE_CART_ITEM_MICROSTORE_ID_LIST = 'cartSidebar/UPDATE_CART_ITEM_MICROSTORE_ID_LIST',
  ASSIGN_MICROSTORE = 'cartSidebar/ASSIGN_MICROSTORE',
  REMOVE_MICROSTORE = 'cartSidebar/REMOVE_MICROSTORE',
  UPDATE_MICROSTORE_VALUE = 'cartSidebar/UPDATE_MICROSTORE_VALUE',
};

export interface CartSidebarReducerAction {
  type: string;
  cartItems: ProductInfo[];
  cartItemMicroStoreIds: string[];
  cartItemMicroStoreId?: string;
  cartItemData?: ProductInfo;
  microStoreProperty?: string;
  microStorePropertyValue?: any;
  isSidebarOpen: boolean;
}

export interface CartSidebarReducerState {
  [key: string]: any;
  cartItems: ProductInfo[];
  cartItemMicroStoreIds: string[];
  isSidebarOpen: boolean;
}
