import { useState, useEffect } from 'react';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';
import { BrowseApis } from '../../apis/api-contexts';
import {
  ProductListActionTypes,
  ProductListHookSettings,
  ProductListReducerState,
} from './ProductList-models';

export const createProductMicroStores = (
  productList: ProductInfo[],
  dispatch: React.Dispatch<any>,
  hookSettings: ProductListHookSettings,
  setIsFetching: (status: boolean) => void,
) => {
  // Spin up microStores keeping a list of associated microStoreIds for future mapping operations
  if (hookSettings.asyncEnabled) {
    const productMicroStoreIds = productList.map((product) => {
      dispatch({
        type: ProductListActionTypes.ASSIGN_MICROSTORE,
        productMicroStoreId: product.value,
        productData: product,
      });

      return product.value;
    });

    dispatch({
      type: ProductListActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST,
      productMicroStoreIds,
    });

    setIsFetching(false);
  }
};

export const refreshProductList = async (
  dispatch: React.Dispatch<any>,
  browseApis: BrowseApis,
  hookSettings: ProductListHookSettings,
  setIsFetching: (status: boolean) => void,
) => {
  try {
    // Fetch available products from the server and update the store when retrieved
    const newProductList = await browseApis.getAvailableProductsList();

    // Create microStores
    createProductMicroStores(newProductList, dispatch, hookSettings, setIsFetching);
  } catch (error) {
    console.error(error);
  }
};

// Custom Hooks
export const useUpdateAvailableProducts = (
  dispatch: React.Dispatch<any>,
  browseApis: BrowseApis,
  productListStore: ProductListReducerState,
) => {
  const [isFetching, setIsFetching] = useState(!productListStore.productMicroStoreIds.length);

  useEffect(() => {
    const hookSettings: ProductListHookSettings = {
      asyncEnabled: true,
    };

    if (isFetching) {
      refreshProductList(dispatch, browseApis, hookSettings, setIsFetching);
    }

    return () => { hookSettings.asyncEnabled = false; };
  }, [dispatch, browseApis, isFetching]);

  return isFetching;
};
