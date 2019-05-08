import { ProductInfo } from '../../utils/product-info-helpers';

import {
  ConfigurationReducerState,
  ConfigurationReducerAction,
  ConfigurationActionTypes,
} from './Configuration-models';

export const initialTempProductStore: ProductInfo = {
  label: '',
  value: 'temp',
  claimedSizes: {},
  availableSizes: {},
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  priceTimer: '',
  imgUrl: '',
};

export const configurationInitialState: ConfigurationReducerState = {
  productMicroStoreIds: [],
  activeProductStoreId: '',
  temp: initialTempProductStore,
};

export const configurationReducer = (
  state: ConfigurationReducerState,
  action: ConfigurationReducerAction,
) => {
  switch (action.type) {
    case ConfigurationActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST: {
      return {
        ...state,
        ...action.productMicroStoreIds && {
          productMicroStoreIds: action.productMicroStoreIds,
        },
      };
    }

    case ConfigurationActionTypes.ASSIGN_MICROSTORE: {
      const { productMicroStoreId, productData } = action;
      return {
        ...state,
        ...productMicroStoreId && productData && {
          [productMicroStoreId]: productData,
        },
      };
    }

    case ConfigurationActionTypes.REMOVE_MICROSTORE: {
      const { productMicroStoreId } = action;

      if (!productMicroStoreId) {
        // Nothing to remove
        return state;
      }

      const { [productMicroStoreId]: removedMicroStore, ...newState } = state;
      return newState as ConfigurationReducerState;
    }

    case ConfigurationActionTypes.UPDATE_MICROSTORE_VALUE: {
      const {
        productMicroStoreId,
        microStoreProperty,
        microStorePropertyValue,
      } = action;

      if (!productMicroStoreId || !state[productMicroStoreId]) {
        // No matching microstore to update
        return state;
      }

      return {
        ...state,
        [productMicroStoreId]: {
          ...state[productMicroStoreId],
          ...microStoreProperty && {
            [microStoreProperty]: microStorePropertyValue,
          },
        },
      };
    }

    case ConfigurationActionTypes.UPDATE_ACTIVE_PRODUCT_STORE_ID: {
      const {
        activeProductStoreId,
      } = action;

      return {
        ...state,
        ...typeof activeProductStoreId !== 'undefined' && { activeProductStoreId },
      };
    }

    default:
      return state;
  }
};
