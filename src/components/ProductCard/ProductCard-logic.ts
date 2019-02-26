import { ProductInfo } from "./ProductCard-models";
import { StoreContext } from '../../rootReducer';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';

// Event Handlers
export const handleAddToCartOnClick = (storeContext: StoreContext, data: ProductInfo) => {
  console.log('add to cart was clicked');

  storeContext.dispatch({
    type: CartSidebarActionTypes.UPDATE_CART_ITEMS,
    cartItems: [
      ...storeContext.state.cartSidebarReducer.cartItems,
      data,
    ],
  });
};
