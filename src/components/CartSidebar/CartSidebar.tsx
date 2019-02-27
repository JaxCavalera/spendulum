import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Store Provider
import { StoreContextLive } from '../../rootReducer';

// Logic
import { placeholderFn } from './CartSidebar-logic';

// Styles
import {
  CartSidebarWrapper,
  CartHeading,
  CartItemWrapper,
} from './CartSidebar-styles';

export interface CartSidebarProps { }

export const CartSidebar = ({ }: CartSidebarProps) => {
  const storeContext = useContext(StoreContextLive);
  const { cartItems, isSidebarOpen } = storeContext.state.cartSidebarReducer;

  return (
    <ErrorBoundary>
      <CartSidebarWrapper isSidebarOpen={isSidebarOpen}>
        <CartHeading>Shopping Cart</CartHeading>
        {
          cartItems.map((cartItem) => <CartItemWrapper key={cartItem.value}>{cartItem.label}</CartItemWrapper>)
        }
      </CartSidebarWrapper>
    </ErrorBoundary>
  );
};
