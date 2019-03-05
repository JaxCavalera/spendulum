// APIs
import { fetchAvailableProductsList } from './ProductList-apis';

// Models
import { ProductInfo } from '../ProductCard/ProductCard-models';
import { ProductListActionTypes } from './ProductList-models';

export const createProductMicroStores = (
  productList: ProductInfo[],
  dispatch: React.Dispatch<any>
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
  productList: ProductInfo[],
  dispatch: React.Dispatch<any>,
) => {
  // This can be replaced with periodic productList updates once using live data that is updated
  if (!productList.length) {

    try {
      // Fetch available products from the server and update the store when retrieved
      const newProductList = await fetchAvailableProductsList();

      // Create microStores
      createProductMicroStores(newProductList, dispatch);

      // Update the Product List store
      dispatch({
        type: ProductListActionTypes.UPDATE_PRODUCT_LIST,
        productList: newProductList,
      });
    } catch (error) {
      console.error(error);
    }
  }
};
