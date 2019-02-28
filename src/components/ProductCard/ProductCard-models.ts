export interface SizeOptions {
  [key: string]: number | undefined;
  na?: number;
  xxsmall?: number;
  xsmall?: number;
  small?: number;
  medium?: number;
  large?: number;
  xlarge?: number;
  xxlarge?: number;
  xxxlarge?: number;
}

export enum ProductCardActionTypes { };

export interface ProductInfo {
  availableSizes: SizeOptions;
  claimedSizes: SizeOptions;
  label: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  priceTimer: number;
  value: string;
  imgUrl?: string;
}

export interface ProductCardReducerAction {
  type: ProductCardActionTypes;
}

export interface ProductCardReducerState { }
