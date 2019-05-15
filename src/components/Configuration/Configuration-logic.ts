import { useState, useEffect } from 'react';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';
import { ConfigApis } from '../../apis/api-contexts';
import {
  ConfigurationActionTypes,
  ConfigurationHookSettings,
  ConfigurationReducerState,
  newProductStoreId,
} from './Configuration-models';

export const createCurrentProductMicroStores = (
  productList: ProductInfo[],
  dispatch: React.Dispatch<any>,
  hookSettings: ConfigurationHookSettings,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // Spin up microStores keeping a list of associated microStoreIds for future mapping operations
  if (hookSettings.asyncEnabled) {
    const currentProductMicroStoreIds = productList.map(product => {
      dispatch({
        type: ConfigurationActionTypes.ASSIGN_MICROSTORE,
        productMicroStoreId: product.value,
        productData: product,
      });

      return product.value;
    });

    dispatch({
      type: ConfigurationActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST,
      productMicroStoreIds: currentProductMicroStoreIds,
    });

    setIsFetching(false);
  }
};

export const refreshCurrentProductsList = async (
  dispatch: React.Dispatch<any>,
  configApis: ConfigApis,
  hookSettings: ConfigurationHookSettings,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    // Fetch available products from the server and update the store when retrieved
    const currentProductsList = await configApis.getAvailableProductsList();

    // Create microStores
    createCurrentProductMicroStores(currentProductsList, dispatch, hookSettings, setIsFetching);
  } catch (error) {
    console.error(error);
  }
};

export const handleAddProductOnClick = (dispatch: React.Dispatch<any>) => {
  // Set the activeProductStoreId to addNewProduct
  dispatch({
    type: ConfigurationActionTypes.UPDATE_ACTIVE_PRODUCT_STORE_ID,
    activeProductStoreId: newProductStoreId,
  });
};

// Custom hooks
export const useGetCurrentProducts = (
  dispatch: React.Dispatch<any>,
  configApis: ConfigApis,
  configurationStore: ConfigurationReducerState,
) => {
  const [isFetching, setIsFetching] = useState(!configurationStore.productMicroStoreIds.length);

  useEffect(() => {
    const hookSettings: ConfigurationHookSettings = {
      asyncEnabled: true,
    };

    if (isFetching) {
      refreshCurrentProductsList(dispatch, configApis, hookSettings, setIsFetching);
    }

    return () => { hookSettings.asyncEnabled = false; };
  }, [dispatch, configApis, isFetching]);

  return isFetching;
};
