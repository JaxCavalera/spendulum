import { ProductInfo, SizeOptions } from "./ProductCard-models";
import { StoreContext } from '../../rootReducer';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';
import { ProductListActionTypes } from '../ProductList/ProductList-models';
import { deepClone } from '../../utils/deep-clone';

export const calculateClaimedSizes = (
  existingClaimedSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
): SizeOptions => {
  const existingQty = existingClaimedSizes[selectedSize];
  const combinedQty = typeof existingQty !== 'undefined' && (existingQty + requestedQty);

  return {
    ...existingClaimedSizes,
    [selectedSize]: combinedQty || requestedQty,
  };
};

export const calculateAvailableSizes = (
  existingAvailableSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
): SizeOptions => {
  const existingAvailableQty = existingAvailableSizes[selectedSize];
  const newAvailableQty = typeof existingAvailableQty !== 'undefined' && (existingAvailableQty - requestedQty);

  // Typescript compiler limitation workaround - default to 0
  return {
    ...existingAvailableSizes,
    [selectedSize]: newAvailableQty || 0,
  };
};

export const verifyItemHasEnoughQty = (
  targetItem: ProductInfo,
  selectedSize: string,
  requestedQty: number,
): boolean => {
  const availableQty = targetItem.availableSizes[selectedSize];
  return !!availableQty && (availableQty >= requestedQty);
};

/**
 * Used to avoid duplicate listings of the same product in the cart
 */
export const consolidateCartItems = (
  newItem: ProductInfo,
  cartItems: ProductInfo[],
  selectedSize: string,
  requestedQty: number,
): ProductInfo[] => {
  if (!verifyItemHasEnoughQty(newItem, selectedSize, requestedQty)) {
    // Ignore attempt to add sold out or unknown item size
    return cartItems;
  }

  // Workaround for Typescript being unable to remember we checked that the selectedSize is available
  const availableQty = newItem.availableSizes[selectedSize] || requestedQty;

  // Scan for an existing item alredy in the cart
  const [matchingCartItem] = cartItems.filter(item => item.value === newItem.value);

  if (!matchingCartItem) {
    const adjustedItem = { ...newItem };
    adjustedItem.claimedSizes[selectedSize] = requestedQty;
    adjustedItem.availableSizes[selectedSize] = availableQty - requestedQty;

    // Add new item to the cart
    return [
      ...cartItems,
      adjustedItem,
    ];
  }


  // Dealing with an existing item in the cart so combine size quantities
  const newClaimedSizes = calculateClaimedSizes(matchingCartItem.claimedSizes, selectedSize, requestedQty);
  const newAvailableSizes = calculateAvailableSizes(matchingCartItem.availableSizes, selectedSize, requestedQty);

  // Create new cartItem using calculated size values
  const mergedCartItem = {
    ...matchingCartItem,
    claimedSizes: newClaimedSizes,
    availableSizes: newAvailableSizes,
  };

  // Generate a new list of cartItems switching out the updated item so the display order in the UI is unaffected
  return cartItems.map(item => (item.value === newItem.value) ? mergedCartItem : item);
};

export const calculateUpdatedProductList = (
  existingProductList: ProductInfo[],
  targetItem: ProductInfo,
  selectedSize: string,
  requestedQty: number,
) => {
  // Create a new list of products updating the target item so the display order in the UI is unaffected
  const updatedProductList = existingProductList.map(product => {
    if (product.value !== targetItem.value) {
      // Skip over products that have not been updated
      return product;
    }

    if (!verifyItemHasEnoughQty(product, selectedSize, requestedQty)) {
      // Avoid updating the product data if it doesn't have enough of the selectedSize available
      return product;
    }

    const newAvailableSizes = calculateAvailableSizes(product.availableSizes, selectedSize, requestedQty);

    // Create new product using the newAvailableSizes
    return {
      ...product,
      availableSizes: newAvailableSizes,
    };
  });

  return updatedProductList;
};

// Event Handlers
export const handleAddToCartOnClick = (
  storeContext: StoreContext,
  data: ProductInfo,
  selectedSize: string,
) => {
  const { cartItems } = storeContext.state.cartSidebarReducer;

  // Use a custom deep clone function to ensure any deep level changes to properties on the selected item do not reference the original
  const clonedData = deepClone(data);

  // Consolidate cart items
  const newCartItems = consolidateCartItems(clonedData, cartItems, selectedSize, 1);

  // Update Cart Items
  storeContext.dispatch({
    type: CartSidebarActionTypes.UPDATE_CART_ITEMS,
    cartItems: newCartItems,
  });

  // Update ProductList so available qty on items in the store remains accurate
  const { productList } = storeContext.state.productListReducer;
  const updatedProductList = calculateUpdatedProductList(productList, clonedData, selectedSize, 1);

  storeContext.dispatch({
    type: ProductListActionTypes.UPDATE_PRODUCT_LIST,
    productList: updatedProductList,
  });
};
