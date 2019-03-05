import { ProductInfo } from '../ProductCard/ProductCard-models';

export enum ProductListActionTypes {
  UPDATE_PRODUCT_LIST = 'productList/UPDATE_PRODUCT_LIST',
  UPDATE_PRODUCT_MICROSTORE_ID_LIST = 'productList/UPDATE_PRODUCT_MICROSTORE_ID_LIST',
  ASSIGN_MICROSTORE = 'productList/ASSIGN_MICROSTORE',
  REMOVE_MICROSTORE = 'productList/REMOVE_MICROSTORE',
  UPDATE_MICROSTORE_VALUE = 'productList/UPDATE_MICROSTORE_VALUE',
};

export interface ProductListReducerAction {
  type: string;
  productList?: ProductInfo[];
  productMicroStoreIds?: string[];
  productMicroStoreId?: string;
  productData?: ProductInfo;
  microStoreProperty?: string;
  microStorePropertyValue?: any;
}

export interface ProductListReducerState {
  [key: string]: any;
  productList: ProductInfo[];
  productMicroStoreIds: string[];
}
