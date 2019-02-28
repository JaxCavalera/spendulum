import { ProductInfo } from "./ProductCard-models";
import { StoreContext } from '../../rootReducer';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';

// export const mergeDuplicateItems = (
//   newItem: ProductInfo,
//   matchingCartItem: ProductInfo,
//   selectedSize: string,
//   requestedQty: number,
// ): ProductInfo => {
//   const 
// };

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

  const [matchingCartItem] = cartItems.filter(item => item.value === newItem.value);

  if (!matchingCartItem) {
    // Workaround for Typescript being unable to remember we checked that the selectedSize is available
    const availableQty = newItem.availableSizes[selectedSize] || requestedQty;

    const adjustedItem = {
      ...newItem,
      claimedSizes: {
        [selectedSize]: requestedQty,
      },
      availableSizes: {
        ...newItem.availableSizes,
        [selectedSize]: availableQty - requestedQty,
      }
    };

    // Add new item to the cart
    return [
      ...cartItems,
      adjustedItem,
    ];
  }


  // Dealing with an existing item in the cart so combine size quantities
  // const combinedClaimedSizes = mergeDuplicateItems(newItem, matchingCartItem, selectedSize, requestedQty);

  // currently ignores duplicate items
  return cartItems;
};

// Event Handlers
export const handleAddToCartOnClick = (
  storeContext: StoreContext,
  data: ProductInfo,
  selectedSize: string,
) => {
  const { cartItems } = storeContext.state.cartSidebarReducer;
  console.log(data);
  // Consolidate cart items
  const newCartItems = consolidateCartItems(data, cartItems, selectedSize, 1);
  console.log(newCartItems);

  storeContext.dispatch({
    type: CartSidebarActionTypes.UPDATE_CART_ITEMS,
    cartItems: newCartItems,
  });
};
