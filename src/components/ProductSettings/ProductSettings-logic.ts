import { ConfigurationActionTypes, ConfigurationReducerAction } from '../Configuration/Configuration-models';
import { ConfigApis } from '../../apis/api-contexts';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';

export const handleEditOnClick = (
  dispatch: React.Dispatch<ConfigurationReducerAction>,
  configProductMicroStoreId: string,
) => {
  dispatch({
    type: ConfigurationActionTypes.UPDATE_ACTIVE_PRODUCT_STORE_ID,
    activeProductStoreId: configProductMicroStoreId,
  });
};

export const handleRemoveOnClick = async (
  dispatch: React.Dispatch<any>,
  configApis: ConfigApis,
  cartItemMicroStoreIds: string[],
  productMicroStoreIds: string[],
  configProductMicroStoreIds: string[],
  configProductMicroStoreId: string,
) => {
  try {
    // Attempt removing the target product from the backend
    await configApis.deleteProduct(configProductMicroStoreId);

    // Remove the target product from the cart sidebar if found
    const newCartItemMicroStoreIds = cartItemMicroStoreIds.filter(
      storeId => storeId !== configProductMicroStoreId,
    );

    if (newCartItemMicroStoreIds.length !== cartItemMicroStoreIds.length) {
      dispatch({
        type: CartSidebarActionTypes.UPDATE_CART_ITEM_MICROSTORE_ID_LIST,
        cartItemMicroStoreIds: newCartItemMicroStoreIds,
      });

      dispatch({
        type: CartSidebarActionTypes.REMOVE_MICROSTORE,
        cartItemMicroStoreId: configProductMicroStoreId,
      });
    }

    // Remove the target product from the productsList if found
    const newProductMicroStoreIds = productMicroStoreIds.filter(
      storeId => storeId !== configProductMicroStoreId,
    );

    if (newProductMicroStoreIds.length !== productMicroStoreIds.length) {
      dispatch({
        type: ProductListActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST,
        productMicroStoreIds: newProductMicroStoreIds,
      });

      dispatch({
        type: ProductListActionTypes.REMOVE_MICROSTORE,
        productMicroStoreId: configProductMicroStoreId,
      });
    }

    // Remove the target product from the configProducts if found
    const newConfigProductMicroStoreIds = configProductMicroStoreIds.filter(
      storeId => storeId !== configProductMicroStoreId,
    );

    if (newConfigProductMicroStoreIds.length !== configProductMicroStoreIds.length) {
      dispatch({
        type: ConfigurationActionTypes.UPDATE_PRODUCT_MICROSTORE_ID_LIST,
        productMicroStoreIds: newProductMicroStoreIds,
      });

      dispatch({
        type: ConfigurationActionTypes.REMOVE_MICROSTORE,
        configProductMicroStoreId,
      });
    }
  } catch (error) {
    console.error('Failed to remove an existing product', error);
  }
};
