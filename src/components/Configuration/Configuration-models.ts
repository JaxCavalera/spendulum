import { ProductInfo } from '../../utils/product-info-helpers';

export enum ConfigurationActionTypes {
  UPDATE_PRODUCT_MICROSTORE_ID_LIST = 'configuration/UPDATE_PRODUCT_MICROSTORE_ID_LIST',
  ASSIGN_MICROSTORE = 'configuration/ASSIGN_MICROSTORE',
  REMOVE_MICROSTORE = 'configuration/REMOVE_MICROSTORE',
  UPDATE_MICROSTORE_VALUE = 'configuration/UPDATE_MICROSTORE_VALUE',
}

export interface ConfigurationReducerAction {
  type: string;
  productMicroStoreIds?: string[];
  productMicroStoreId?: string;
  productData?: ProductInfo;
  microStoreProperty?: string;
  microStorePropertyValue?: any;
}

export interface ConfigurationReducerState {
  [key: string]: any;
  productMicroStoreIds: string[];
}
