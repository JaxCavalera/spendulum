import { Dispatch } from 'react';

export interface SizeOption {
  label: string;
  value: number;
}

export interface ProductCardActionTypes {
  UPDATE_ALL_ITEMS: 'productCard/UPDATE_ALL_ITEMS',
  UPDATE_ACTIVE_ITEM_DATA: 'productCard/UPDATE_ACTIVE_ITEM_DATA',
}

export interface ActiveItemDataType {
  label: string;
  value: string;
  sizeRange: string[];
  availableSizes: SizeOption[];
  price: number;
  imgUrl?: string;
}

export interface ProductCardReducerAction {
  type: string;
  activeItemData?: ActiveItemDataType;
  allProductCards?: ActiveItemDataType[];
}

export interface ProductCardReducerState {
  allProductCards: ActiveItemDataType[];
  activeItemData?: ActiveItemDataType;
}

export interface ProductCardProps {
  data: ActiveItemDataType;
  // productCardState: ProductCardReducerState;
  // dispatchProductCardState: Dispatch<ProductCardReducerAction>;
}
