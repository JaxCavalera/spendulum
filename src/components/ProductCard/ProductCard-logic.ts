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
  const newSizeLabel = Object.keys(newItem.claimedSizes)[0];
  const newItemClaimQty = newItem.claimedSizes[newSizeLabel];
  const outOfStock = (
    !newItem.availableSizes[newSizeLabel] ||
    newItemClaimQty > newItem.availableSizes[newSizeLabel]
  );

  const newCartItems = cartItems.map(item => {
    if (item.value !== newItem.value) {
      // Not our item so move ont othe next one in the cart
      return item;
    }

    // Item is a match so update the existing cartItem's quantity
    matchFound = true;
    const updatedItem: ProductInfo = item;

    // Error handling - console.warn and ignore attempt to add item to cart
    if (!updatedItem.availableSizes[newSizeLabel] || outOfStock) {
      console.warn(`Failed to add the item ${newItem.label} to cart requested size is out of stock.`);
      return item;
    }

    if (newSizeLabel && updatedItem.claimedSizes[newSizeLabel]) {
      updatedItem.claimedSizes[newSizeLabel] += newItemClaimQty;
      updatedItem.availableSizes[newSizeLabel] -= newItemClaimQty;
      return updatedItem;
    }

    // Item size has not been claimed before
    updatedItem.claimedSizes[newSizeLabel] = newItemClaimQty;
    updatedItem.availableSizes[newSizeLabel] -= newItemClaimQty;
    return updatedItem;
  });

  // Match was found so return the consolidate list of cart items
  if (matchFound) {
    return newCartItems;
  }

  // No match was found so attempt to add the newItem to the cart
  if (!outOfStock) {
    newItem.availableSizes[newSizeLabel] -= newItemClaimQty;
    newCartItems.push(newItem);
  }

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
