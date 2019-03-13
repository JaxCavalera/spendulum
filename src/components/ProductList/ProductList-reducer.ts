import {
  ProductListReducerState,
  ProductListReducerAction,
  ProductListActionTypes,
} from './ProductList-models';

export const productListInitialState: ProductListReducerState = {
  productMicroStoreIds: [],
};

export const productListReducer = (
  state: ProductListReducerState,
  action: ProductListReducerAction,
): ProductListReducerState => {
  switch (action.type) {
    case ProductListActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST: {
      return {
        ...state,
        ...action.productMicroStoreIds && {
          productMicroStoreIds: action.productMicroStoreIds,
        },
      };
    }

    case ProductListActionTypes.ASSIGN_MICROSTORE: {
      const { productMicroStoreId, productData } = action;
      return {
        ...state,
        ...productMicroStoreId && productData && {
          [productMicroStoreId]: productData,
        },
      };
    }

    case ProductListActionTypes.REMOVE_MICROSTORE: {
      const { productMicroStoreId } = action;

      if (!productMicroStoreId) {
        // Nothing to remove
        return state;
      }

      const { [productMicroStoreId]: removedMicroStore, ...newState } = state;
      return newState as ProductListReducerState;
    }

    case ProductListActionTypes.UPDATE_MICROSTORE_VALUE: {
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

    default:
      return state;
  }
};
