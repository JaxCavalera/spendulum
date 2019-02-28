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
  CartItemLabel,
  ClaimedSize,
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
          cartItems.map((cartItem) => (
            <CartItemWrapper key={cartItem.value}>
              <CartItemLabel>{cartItem.label}</CartItemLabel>
              {
                Object.keys(cartItem.claimedSizes).map(sizeOption => (
                  <ClaimedSize key={sizeOption}>{sizeOption} : {cartItem.claimedSizes[sizeOption]}</ClaimedSize>
                ))
              }
            </CartItemWrapper>
          ))
        }
      </CartSidebarWrapper>
    </ErrorBoundary>
  );
};
