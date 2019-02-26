import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Store Provider
import { StoreContextLive } from '../../rootReducer';

// Logic
import { placeholderFn } from './CartSidebar-logic';

// Styles
import { CartSidebarWrapper } from './CartSidebar-styles';
import { SectionParagraph } from '../../utils/shared-styles';

export interface CartSidebarProps { }

export const CartSidebar = ({ }: CartSidebarProps) => {
  const storeContext = useContext(StoreContextLive);

  const { cartItems } = storeContext.state.cartSidebarReducer;
  console.log(storeContext.state);

  return (
    <ErrorBoundary>
      <CartSidebarWrapper>
        <p>Cart Items Go Here</p>
        {
          cartItems.map((cartItem) => <SectionParagraph key={cartItem.value}>{cartItem.label}</SectionParagraph>)
        }
      </CartSidebarWrapper>
    </ErrorBoundary>
  );
};
