import { ProductInfo } from "./ProductCard-models";
import { StoreContext } from '../../rootReducer';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';

/**
 * Prevents the same item being listed multiple times in the shopping cart, stacks qty instead
 * @param newItem object The new item that was added to the cart
 * @param cartItems array List of existing items already in the cart
 */
export const consolidateCartItems = (newItem: ProductInfo, cartItems: ProductInfo[]): ProductInfo[] => {
  let matchFound: boolean = false;
  const newCartItems = cartItems.map(item => {
    if (item.value !== newItem.value) {
      return item;
    }

    // Item is a match so update the existing cartItem's quantity
    matchFound = true;
    const updatedItem: ProductInfo = item;
    const newSizeLabel = Object.keys(newItem.claimedSizes)[0];

    // Error handling - console.warn and ignore attempt to add item to cart
    if (!updatedItem.availableSizes[newSizeLabel]) {
      console.warn(`Failed to add the item ${newItem.label} to cart as no qty in the chosen size were found.`);
      return item;
    }

    if (newSizeLabel && updatedItem.claimedSizes[newSizeLabel]) {
      updatedItem.claimedSizes[newSizeLabel] += 1;
      updatedItem.availableSizes[newSizeLabel] -= 1;
      return updatedItem;
    }

    // Item size has not been claimed before
    updatedItem.claimedSizes[newSizeLabel] = 1;
    updatedItem.availableSizes[newSizeLabel] -= 1;
    return updatedItem;
  });

  // Match was found so return the consolidate list of cart items
  if (matchFound) {
    return newCartItems;
  }

  // No match was found so add the newItem to the cart
  newCartItems.push(newItem);
  return newCartItems;
};

// Event Handlers
export const handleAddToCartOnClick = (storeContext: StoreContext, data: ProductInfo) => {
  const { cartItems } = storeContext.state.cartSidebarReducer;

  // Consolidate cart items
  const newCartItems = consolidateCartItems(data, cartItems);

  storeContext.dispatch({
    type: CartSidebarActionTypes.UPDATE_CART_ITEMS,
    cartItems: newCartItems,
  });
};
