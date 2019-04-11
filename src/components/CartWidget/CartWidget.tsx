import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';

// Models
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';

// Images
import { ShoppingCart } from '../../images/icons';

// Styles
import { CartButton } from './CartWidget-styles';

// Test Ids
export enum cartWidgetTestIds {
  CartButton = 'cartWidget/CartButton',
}

export interface CartWidgetProps { }

export const CartWidget = ({ }: CartWidgetProps) => {
  const store = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);
  const { isSidebarOpen, cartItemMicroStoreIds } = store.cartSidebarStore;

  const handleCartOnClick = () => {
    dispatch({
      type: CartSidebarActionTypes.UPDATE_IS_SIDEBAR_OPEN,
      isSidebarOpen: !isSidebarOpen,
    });
  };

  return (
    <ErrorBoundary>
      <CartButton
        data-testid={cartWidgetTestIds.CartButton}
        isSidebarOpen={isSidebarOpen}
        onClick={handleCartOnClick}
        title={`${isSidebarOpen ? 'Hide' : 'Show'} Cart`}
        hasItems={!!cartItemMicroStoreIds.length}
      >
        <ShoppingCart />
      </CartButton>
    </ErrorBoundary>
  );
};
