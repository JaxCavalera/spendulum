import {
  ConfigurationReducerState,
  ConfigurationReducerAction,
  ConfigurationActionTypes,
} from './Configuration-models';

export const configurationInitialState: ConfigurationReducerState = {
  configProductMicroStoreIds: [],
  activeProductStoreId: '',
};

export const configurationReducer = (
  state: ConfigurationReducerState,
  action: ConfigurationReducerAction,
) => {
  switch (action.type) {
    case ConfigurationActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST: {
      return {
        ...state,
        ...action.configProductMicroStoreIds && {
          configProductMicroStoreIds: action.configProductMicroStoreIds,
        },
      };
    }

    case ConfigurationActionTypes.ASSIGN_MICROSTORE: {
      const { configProductMicroStoreId, productData } = action;
      return {
        ...state,
        ...configProductMicroStoreId && productData && {
          [configProductMicroStoreId]: productData,
        },
      };
    }

    case ConfigurationActionTypes.REMOVE_MICROSTORE: {
      const { configProductMicroStoreId } = action;

      if (!configProductMicroStoreId) {
        // Nothing to remove
        return state;
      }

      const { [configProductMicroStoreId]: removedMicroStore, ...newState } = state;
      return newState as ConfigurationReducerState;
    }

    case ConfigurationActionTypes.UPDATE_MICROSTORE_VALUE: {
      const {
        configProductMicroStoreId,
        microStoreProperty,
        microStorePropertyValue,
      } = action;

      if (!configProductMicroStoreId || !state[configProductMicroStoreId]) {
        // No matching microstore to update
        return state;
      }

      return {
        ...state,
        [configProductMicroStoreId]: {
          ...state[configProductMicroStoreId],
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
