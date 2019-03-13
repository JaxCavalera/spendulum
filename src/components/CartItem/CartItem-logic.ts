// Utils
import { updateProductSizes, ProductInfo, SizeOptions, maintainSizeOrder } from '../../utils/product-info-helpers';

// Models
import { RootReducerStore } from '../../container/rootReducer';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';

export const removeEmptyClaimedSizes = (
  claimedSizes: SizeOptions,
): string[] => {
  const filteredSizes = Object.keys(claimedSizes).filter((name) => {
    const sizeQty = claimedSizes[name];
    return (typeof sizeQty !== 'undefined' && sizeQty > 0);
  });

  return filteredSizes.sort(maintainSizeOrder);
};

export const handleItemQtyOnChange = (
  newQty: number,
  sizeOption: string,
  cartItem: ProductInfo,
  store: RootReducerStore,
  dispatch: React.Dispatch<any>,
) => {
  const currentQty = cartItem.claimedSizes[sizeOption];

  // Avoid unnecessary processing
  if (typeof currentQty === 'undefined' || currentQty === newQty) {
    return;
  }

  const qtyDiff = newQty - currentQty;
  const isAdding = qtyDiff > 0;

  const adjustedProductData = updateProductSizes(cartItem, sizeOption, Math.abs(qtyDiff), isAdding);

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
