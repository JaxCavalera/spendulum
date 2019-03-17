import { addMinutes } from 'date-fns';

// Utils
import {
  updateProductSizes,
  ProductInfo,
  SizeOptions,
  maintainSizeOrder,
} from '../../utils/product-info-helpers';

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

export const calcNewPriceTimerStr = (minsDuration: number): string => {
  const newPriceTimerDateObj = addMinutes(new Date(), minsDuration);
  return newPriceTimerDateObj.toISOString();
};

// Event Handlers

export const handleTimerOnEnd = (
  cartItem: ProductInfo,
  store: RootReducerStore,
  dispatch: React.Dispatch<any>,
) => {
  const newPriceTimerStr = calcNewPriceTimerStr(20);
  const productCardData: ProductInfo = store.productListStore[cartItem.value];

  if (!productCardData) {
    throw new Error('Cart item has no matching product data, verify checkout logic!');
  }

  const updatedCartItemData = {
    ...cartItem,
    priceTimer: newPriceTimerStr,
    price: productCardData.price,
  };

  dispatch({
    type: CartSidebarActionTypes.ASSIGN_MICROSTORE,
    cartItemMicroStoreId: cartItem.value,
    cartItemData: updatedCartItemData,
  });
}

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
    const matchingProductData: ProductInfo | undefined = store.productListStore[cartItem.value];

    dispatch({
      type: ProductListActionTypes.ASSIGN_MICROSTORE,
      productMicroStoreId: cartItem.value,
      productData: {
        ...adjustedProductData,
        ...{ priceTimer: matchingProductData ? matchingProductData.priceTimer : cartItem.priceTimer },
        ...{ price: matchingProductData ? matchingProductData.price : cartItem.price },
      },
    });
  }
};

export const handleTrashBtnOnClick = (
  cartItem: ProductInfo,
  store: RootReducerStore,
  dispatch: React.Dispatch<any>,
  claimedSizesIsEmpty: boolean,
) => {
  const { cartItemMicroStoreIds } = store.cartSidebarStore;
  const newCartItemMicroStoreIdList = cartItemMicroStoreIds.filter(microStoreId => microStoreId !== cartItem.value);

  dispatch({
    type: CartSidebarActionTypes.UPDATE_CART_ITEM_MICROSTORE_ID_LIST,
    cartItemMicroStoreIds: newCartItemMicroStoreIdList,
  });

  if (claimedSizesIsEmpty) {
    dispatch({
      type: CartSidebarActionTypes.REMOVE_MICROSTORE,
      cartItemMicroStoreId: cartItem.value,
    });

    return;
  }

  if (store.productListStore[cartItem.value]) {
    // Item has claimedSizes that need to be returned before it can be removed from the cart
    const adjustedProductData: ProductInfo = Object.keys(cartItem.claimedSizes).reduce(
      (productData, claimedSize) => {
        const claimedQty = cartItem.claimedSizes[claimedSize] || 0;
        const newProductData = updateProductSizes(productData, claimedSize, claimedQty, false);
        return newProductData || productData;
      },
      store.productListStore[cartItem.value],
    );

    // Return claimedSizes to product
    dispatch({
      type: ProductListActionTypes.ASSIGN_MICROSTORE,
      productMicroStoreId: cartItem.value,
      productData: adjustedProductData,
    });

    // Remove cartItem microStore
    dispatch({
      type: CartSidebarActionTypes.REMOVE_MICROSTORE,
      cartItemMicroStoreId: cartItem.value,
    });

    return;
  }

  // No matching productMicroStore was found for a cartItem (should be impossible)
  console.error('A matching product does not exist for an item in the cartSidebar!');
  return;
};
