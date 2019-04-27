// Models
import { ProductInfo } from '../../utils/product-info-helpers';
import { ProductListActionTypes } from './ProductList-models';
import { BrowseApis } from '../../apis/api-contexts';

export const createProductMicroStores = (
  productList: ProductInfo[],
  dispatch: React.Dispatch<any>,
) => {
  // Spin up microStores keeping a list of associated microStoreIds for future mapping operations
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
};

export const refreshProductList = async (
  productMicroStoreIds: string[],
  dispatch: React.Dispatch<any>,
  browseApis: BrowseApis,
) => {
  // This can be replaced with periodic productList updates once using live data that is updated
  if (!productMicroStoreIds.length) {
    try {
      // Fetch available products from the server and update the store when retrieved
      const newProductList = await browseApis.getAvailableProductsList();

      // Create microStores
      createProductMicroStores(newProductList, dispatch);
    } catch (error) {
      console.error(error);
    }
  }
};
