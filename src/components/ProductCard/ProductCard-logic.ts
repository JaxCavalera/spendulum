import { addMinutes } from 'date-fns';

// Models
import { CartSidebarActionTypes, CartSidebarReducerState } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';

// Utils
import { deepClone } from '../../utils/deep-clone';
import { ProductInfo, updateProductSizes } from '../../utils/product-info-helpers';

/**
 * Generates a random duration to wait before changing the price of a product in the productList
 * @param maxDurationMins - Upper limit to the randomly generated duration
 * @param minDurationMins - Optional lower limit to the randomly generated duration
 * @returns - New priceTimer Date.toISOString
 */
export const createNewRandomPriceTimerStr = (
  maxDurationMins: number,
  minDurationMins: number = 0,
) => {
  const finalMaxDuration = maxDurationMins - minDurationMins;
  const finalMinDuration = minDurationMins;

  const newDuration = Math.ceil(Math.random() * finalMaxDuration) + finalMinDuration;
  const newPriceTimerDateObj = addMinutes(new Date(), newDuration);

  return newPriceTimerDateObj.toISOString();
};

/**
 * Avoids duplicate cartItem listings by adding or replacing items in the sidebar as required
 */
export const adjustCartItems = (
  newItem: ProductInfo,
  cartItemMicroStoreIds: string[],
  cartSidebarStore: CartSidebarReducerState,
  dispatch: React.Dispatch<any>,
) => {
  // Scan for an existing item already in the cart
  const existingCartItem: ProductInfo | undefined = cartSidebarStore[newItem.value];

  if (!existingCartItem) {
    // Update microStoreIds to include the new cartItemMicroStore
    const newCartItemMicroStoreIds = [
      ...cartItemMicroStoreIds,
      newItem.value,
    ];

    dispatch({
      type: CartSidebarActionTypes.UPDATE_CART_ITEM_MICROSTORE_ID_LIST,
      cartItemMicroStoreIds: newCartItemMicroStoreIds,
    });
  }

  // Generate a new cartItem using the existingCartItem.priceTimer if it exists
  const cartItem = {
    ...newItem,
    ...{ priceTimer: existingCartItem ? existingCartItem.priceTimer : addMinutes(new Date(), -20) },
    ...{ price: existingCartItem ? existingCartItem.price : newItem.price },
  };

  // Create or Replace the cartItemMicroStore data
  dispatch({
    type: CartSidebarActionTypes.ASSIGN_MICROSTORE,
    cartItemMicroStoreId: cartItem.value,
    cartItemData: cartItem,
  });
};

/**
 * Creates an updated list of productCards in the productList
 * @param cardIndex - Index of this productCard in the productList array
 * @param existingProductList - The current productList array
 * @param targetItem - Updated details for the product represented by this productCard
 */
export const calculateUpdatedProductList = (
  cardIndex: number,
  existingProductList: ProductInfo[],
  targetItem: ProductInfo,
) => {
  const newProductList = [...existingProductList];
  newProductList[cardIndex] = targetItem;

  return newProductList;
};

export const createNewRandomProductPrice = (minPrice: number, maxPrice: number): number => {
  const finalMax = maxPrice - minPrice;
  const newPrice = (Math.random() * finalMax) + minPrice;
  return Number(newPrice.toFixed(2));
};

// Event Handlers

export const handleProductTimerOnEnd = (
  data: ProductInfo,
  dispatch: React.Dispatch<any>,
) => {
  const newPriceTimerStr = createNewRandomPriceTimerStr(20, 5);
  const newProductPrice = createNewRandomProductPrice(data.minPrice, data.maxPrice);

  const updatedProductData = {
    ...data,
    price: newProductPrice,
    priceTimer: newPriceTimerStr,
  };

  dispatch({
    type: ProductListActionTypes.ASSIGN_MICROSTORE,
    productMicroStoreId: data.value,
    productData: updatedProductData,
  });
};

/**
 * Handles when the "Add to Cart" button on a ProductCard is clicked
 * @param storeContext - Contains a reference to the global store for dispatching shared state updates
 * @param data - Details for the product represented by this productCard
 * @param selectedSize - Property referencing an availableSize on this productCard
 * @param cardIndex - Index of this productCard in the productList array
 */
export const handleAddToCartOnClick = (
  data: ProductInfo,
  selectedSize: string,
  cartItemMicroStoreIds: string[],
  cartSidebarStore: CartSidebarReducerState,
  dispatch: React.Dispatch<any>,
) => {
  // Ensure any deep level changes to properties on the chosen item do not reference / affect the original
  const clonedData = deepClone(data);
  const updatedProduct = updateProductSizes(clonedData, selectedSize, 1, true);

  if (!updatedProduct) {
    // Failed to update the product so exit early
    return;
  }

  // Consolidate cart items
  adjustCartItems(
    updatedProduct,
    cartItemMicroStoreIds,
    cartSidebarStore,
    dispatch,
  );

  // Update ProductList so available qty on items in the store remains accurate
  dispatch({
    type: ProductListActionTypes.ASSIGN_MICROSTORE,
    productMicroStoreId: updatedProduct.value,
    productData: updatedProduct,
  });
};
