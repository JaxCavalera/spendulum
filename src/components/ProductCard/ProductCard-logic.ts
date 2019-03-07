import { format } from 'date-fns';
import addMilliseconds from 'date-fns/add_milliseconds';

// Models
import { ProductInfo, SizeOptions } from "./ProductCard-models";
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';

// Utils
import { deepClone } from '../../utils/deep-clone';

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

export const calculateClaimedSizes = (
  existingClaimedSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
) => {
  const existingQty = existingClaimedSizes[selectedSize];
  const combinedQty = typeof existingQty !== 'undefined' && (existingQty + requestedQty);

  const updatedClaimedSizes: SizeOptions = {
    ...existingClaimedSizes,
    [selectedSize]: combinedQty || requestedQty,
  };

  return updatedClaimedSizes;
};

export const calculateAvailableSizes = (
  existingAvailableSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
) => {
  const existingAvailableQty = existingAvailableSizes[selectedSize];
  const newAvailableQty = typeof existingAvailableQty !== 'undefined' && (existingAvailableQty - requestedQty);

  // Typescript compiler limitation workaround - default to 0
  const updatedAvailableSizes: SizeOptions = {
    ...existingAvailableSizes,
    [selectedSize]: newAvailableQty || 0,
  };

  return updatedAvailableSizes;
};

export const verifyItemHasEnoughQty = (
  targetItem: ProductInfo,
  selectedSize: string,
  requestedQty: number,
) => {
  const availableQty = targetItem.availableSizes[selectedSize];
  return !!availableQty && (availableQty >= requestedQty);
};

/**
 * Used to avoid duplicate listings of the same product in the cart
 */
export const consolidateCartItems = (
  newItem: ProductInfo,
  cartItems: ProductInfo[],
) => {
  // Scan for an existing item alredy in the cart
  const [matchingCartItem] = cartItems.filter(item => item.value === newItem.value);

  if (!matchingCartItem) {
    return [
      ...cartItems,
      newItem,
    ];
  }

  // Item exists so use the priceTimer from the cart if there is any duration left
  const priceTimerDuration = calculateRemainingPriceDuration(matchingCartItem.priceTimer);
  const mergedCartItem = {
    ...newItem,
    ...!!priceTimerDuration && { priceTimer: matchingCartItem.priceTimer },
  };

  // Generate a new list of cartItems switching out the updated item so the display order in the UI is unaffected
  return cartItems.map(item => (item.value === newItem.value) ? mergedCartItem : item);
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

/**
 * Updates quantity related details for the specified product
 * @param product - Details for the product represented by this productCard
 * @param selectedSize - Property referencing an availablesize on this productCard to b eadded to the cart
 * @param qty - Number of items in the selectedSize to be added to the cart
 * @returns - Updated copy of the provided product
 */
export const updateProductData = (product: ProductInfo, selectedSize: string, qty: number) => {
  if (!verifyItemHasEnoughQty(product, selectedSize, 1)) {
    // Avoid updating the product data if it doesn't have enough of the selectedSize available
    return;
  }

  const newClaimedSizes = calculateClaimedSizes(product.claimedSizes, selectedSize, qty);
  const newAvailableSizes = calculateAvailableSizes(product.availableSizes, selectedSize, qty);

  return {
    ...product,
    claimedSizes: newClaimedSizes,
    availableSizes: newAvailableSizes,
  };
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
  cartItems: ProductInfo[],
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
  const newCartItems = consolidateCartItems(updatedProduct, cartItems);

  // Update Cart Items
  dispatch({
    type: CartSidebarActionTypes.UPDATE_CART_ITEMS,
    cartItems: newCartItems,
  });

  // Update ProductList so available qty on items in the store remains accurate
  dispatch({
    type: ProductListActionTypes.ASSIGN_MICROSTORE,
    productMicroStoreId: updatedProduct.value,
    productData: updatedProduct,
  });
};
