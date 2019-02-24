// Store Provider
import { IStoreContext } from '../../rootReducer';

export interface SizeOption {
  label: string;
  value: number;
}

export enum ProductCardActionTypes { };

export interface ProductInfo {
  label: string;
  value: string;
  sizeRange: string[];
  availableSizes: SizeOption[];
  price: number;
  imgUrl?: string;
}

export interface ProductCardReducerAction {
  type: ProductCardActionTypes;
}

export interface ProductCardReducerState { }

export interface ProductCardProps {
  data: ProductInfo;
  storeContext: IStoreContext;
}
