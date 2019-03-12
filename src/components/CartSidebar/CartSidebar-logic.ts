import { CartSidebarReducerState } from './CartSidebar-models';
import { ProductInfo } from '../../utils/product-info-helpers';

export const calcCartItemTotal = (cartItemMicroStore: ProductInfo): number => {
  const {
    claimedSizes,
    price,
  } = cartItemMicroStore;

  const itemTotalQty = Object.keys(claimedSizes).reduce((itemTotal, sizeOptionName) => {
    const sizeQty = claimedSizes[sizeOptionName];
    if (typeof sizeQty !== 'undefined') {
      return sizeQty + itemTotal;
    }

    return itemTotal;
  }, 0);

  return itemTotalQty * price;
};

export const calcCartTotal = (
  cartSidebarStore: CartSidebarReducerState,
  cartItemMicroStoreIds: string[],
): number => cartItemMicroStoreIds.reduce((totalCost, cartItemMicroStoreId) => {
  const cartItemTotal = calcCartItemTotal(cartSidebarStore[cartItemMicroStoreId]);

  return cartItemTotal + totalCost;
}, 0);
