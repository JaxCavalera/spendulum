import { ProductInfo } from '../ProductCard/ProductCard-models';

export enum ProductListActionTypes {
  UPDATE_PRODUCT_LIST = 'productList/UPDATE_PRODUCT_LIST',
};

export interface ProductListReducerAction {
  type: string;
  productList?: ProductInfo[];
}

export interface ProductListReducerState {
  productList: ProductInfo[];
}

export interface ProductListProps { }
