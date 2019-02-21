import { Dispatch } from 'react';

export interface SizeOption {
  label: string;
  value: number;
}

export interface ProductCardActionTypes {
  UPDATE_ALL_ITEMS: 'productCard/UPDATE_ALL_ITEMS',
  UPDATE_ACTIVE_ITEM_DATA: 'productCard/UPDATE_ACTIVE_ITEM_DATA',
}

export interface ProductInfo {
  label: string;
  value: string;
  sizeRange: string[];
  availableSizes: SizeOption[];
  price: number;
  imgUrl?: string;
}

export interface ProductCardReducerAction {
  type: string;
  activeItemData?: ProductInfo;
  allProductCards?: ProductInfo[];
}

export interface ProductCardReducerState {
  allProductCards: ProductInfo[];
  activeItemData?: ProductInfo;
}

export interface ProductCardProps {
  data: ProductInfo;
  // dispatchProductToCart: Dispatch<ProductCardReducerAction>;
  // productCardState: ProductCardReducerState;
}
