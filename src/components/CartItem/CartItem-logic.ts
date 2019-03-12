// Utils
import { updateProductData, ProductInfo } from '../../utils/product-info-helpers';

// Models
import { RootReducerStore } from '../../container/rootReducer';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';

export const handleItemQtyOnChange = (
  newQty: number,
  sizeOption: string,
  cartItem: ProductInfo,
  store: RootReducerStore,
  dispatch: React.Dispatch<any>,
) => {
  const previousQty = cartItem.claimedSizes[sizeOption];
  const finalQty = typeof previousQty !== 'undefined' ? newQty - previousQty : newQty;

  const adjustedProductData = updateProductData(cartItem, sizeOption, finalQty);

  // Only continue the dispatch if the productData was successfully updated
  if (adjustedProductData) {
    // Update the cartItemMicroStore's Available and Claimed Sizes
    dispatch({
      type: CartSidebarActionTypes.ASSIGN_MICROSTORE,
      cartItemMicroStoreId: cartItem.value,
      cartItemData: adjustedProductData,
    });

    // Update the productCardMicroStore's Available and Claimed Sizes
    const matchingProductData: ProductInfo = store.productListStore[cartItem.value];

    dispatch({
      type: ProductListActionTypes.ASSIGN_MICROSTORE,
      productMicroStoreId: cartItem.value,
      productData: {
        ...adjustedProductData,
        ...{ priceTimer: matchingProductData ? matchingProductData.priceTimer : cartItem.priceTimer },
      },
    });
  }
};
