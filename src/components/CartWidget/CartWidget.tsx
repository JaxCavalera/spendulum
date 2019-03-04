import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Store Provider
import { StoreContextLive } from '../../rootReducer';

// Models
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';

// Images
import { ShoppingCart } from '../../images/icons';

// Styles
import { CartButton } from './CartWidget-styles';

export interface CartWidgetProps { }

export const CartWidget = ({ }: CartWidgetProps) => {
  const storeContext = useContext(StoreContextLive);
  const { isSidebarOpen } = storeContext.state.cartSidebarReducer;

  const handleCartOnClick = () => {
    storeContext.dispatch({
      type: CartSidebarActionTypes.UPDATE_IS_SIDEBAR_OPEN,
      isSidebarOpen: !isSidebarOpen,
    });
  };

  return (
    <ErrorBoundary>
      <CartButton
        isSidebarOpen={isSidebarOpen}
        onClick={handleCartOnClick}
        title={`${isSidebarOpen ? 'Hide' : 'Show'} Cart`}
      >
        <ShoppingCart />
      </CartButton>
    </ErrorBoundary>
  );
};
