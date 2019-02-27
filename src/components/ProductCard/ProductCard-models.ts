export interface SizeCollection {
  [label: string]: number;
}

export enum ProductCardActionTypes { };

export interface ProductInfo {
  availableSizes: SizeCollection;
  claimedSizes: SizeCollection;
  label: string;
  price: number;
  value: string;
  imgUrl?: string;
}

export interface ProductCardReducerAction {
  type: ProductCardActionTypes;
}

export interface ProductCardReducerState { }
