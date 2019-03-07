export interface SizeOptions {
  [key: string]: number | undefined;
  NA?: number;
  XXS?: number;
  XS?: number;
  S?: number;
  M?: number;
  L?: number;
  XL?: number;
  XXL?: number;
  XXXL?: number;
}

export enum ProductCardActionTypes { };

export interface ProductInfo {
  availableSizes: SizeOptions;
  claimedSizes: SizeOptions;
  label: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  priceTimer: string;
  value: string;
  imgUrl?: string;
}

export interface ProductCardReducerAction {
  type: ProductCardActionTypes;
}

export interface ProductCardReducerState { }
