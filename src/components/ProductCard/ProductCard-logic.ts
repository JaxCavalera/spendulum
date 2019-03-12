import addMilliseconds from 'date-fns/add_milliseconds';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';
import { CartSidebarActionTypes, CartSidebarReducerState } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';

// Utils
import { deepClone } from '../../utils/deep-clone';
import { updateProductData } from '../../utils/product-info-helpers';

/**
 * Generates a random duration to wait before changing the price of a product in the productList
 * @param maxDurationMins - Upper limit to the randomly generated duration
 * @param minDurationMins - Optional lower limit to the randomly generated duration
 * @returns - duration to wait in milliseconds
 */
export const createPriceDuration = (maxDurationMins: number, minDurationMins?: number) => {
  const maxDurationMilliseconds = ((maxDurationMins - (minDurationMins || 0)) * 60) * 1000;
  const minDurationMilliseconds = minDurationMins ? (minDurationMins * 60) * 1000 : 0;

  const newDuration = Math.ceil(Math.random() * maxDurationMilliseconds) + minDurationMilliseconds;

  return newDuration;
};

/**
 * Calculates how many milliseconds are left before the current pricetimer will expire
 * @param dateIsoString - Current stored value of a priceTimer on a productInfo data set (in cart or in productList)
 * @returns number of milliseconds remaining before the current priceTimer expires
 */
export const calculateRemainingPriceDuration = (dateIsoString: string) => {
  const currentTime = new Date();
  const priceDurationTime = new Date(dateIsoString);

  const currentTimeMs = currentTime.getTime();
  const priceTimerMs = priceDurationTime.getTime();

  // Remaining duration should be a positive value if the iso timestamp is still in the future
  const remainingDuration = priceTimerMs - currentTimeMs;
  return (remainingDuration > 0) ? remainingDuration : 0;
};

export const refreshPriceTimerInProductList = (
  data: ProductInfo,
  dispatch: React.Dispatch<any>,
  updatePriceDuration: React.SetStateAction<any>,
) => {
  const newPriceDuration = createPriceDuration(20, 5);
  const newPriceDate = addMilliseconds(new Date(), newPriceDuration);

  const updatedProductData = {
    ...data,
    priceTimer: newPriceDate.toISOString(),
  };

  // Update the item relating to this productCard in the list
  updatePriceDuration(newPriceDuration);

  dispatch({
    type: ProductListActionTypes.ASSIGN_MICROSTORE,
    productMicroStoreId: updatedProductData.value,
    productData: updatedProductData,
  });
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
  const existingCartItem = cartSidebarStore[newItem.value];

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
    ...{ priceTimer: !!existingCartItem ? existingCartItem.priceTimer : newItem.priceTimer },
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

export const createNewProductPrice = (currentPrice: number, minPrice: number, maxPrice: number): number => {
  const finalMax = maxPrice - minPrice;
  const newPrice = Math.ceil(Math.random() * finalMax) + minPrice;

  if (currentPrice !== newPrice) {
    return newPrice;
  }

  return createNewProductPrice(currentPrice, minPrice, maxPrice);
};

export const refreshListedProductPrice = (data: ProductInfo, dispatch: React.Dispatch<any>) => {
  const newPrice = createNewProductPrice(data.price, data.minPrice, data.maxPrice);

  dispatch({
    type: ProductListActionTypes.UPDATE_MICROSTORE_VALUE,
    productMicroStoreId: data.value,
    microStoreProperty: 'price',
    microStorePropertyValue: newPrice,
  });
};

// Event Handlers

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

  const updatedProduct = updateProductData(clonedData, selectedSize, 1);

  if (!updatedProduct) {
    // Failed to update the product so exit early
    return;
  }

  // Consolidate cart items
  adjustCartItems(
    updatedProduct,
    cartItemMicroStoreIds,
    cartSidebarStore,
    dispatch
  );

  // Update ProductList so available qty on items in the store remains accurate
  dispatch({
    type: ProductListActionTypes.ASSIGN_MICROSTORE,
    productMicroStoreId: updatedProduct.value,
    productData: updatedProduct,
  });
};
