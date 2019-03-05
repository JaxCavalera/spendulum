import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext } from '../../container/rootReducer';

// Components
import { CartItem } from '../CartItem/CartItem';

// Logic
import { placeholderFn } from './CartSidebar-logic';

// Styles
import {
  CartSidebarWrapper,
  CartHeading,
} from './CartSidebar-styles';

export interface CartSidebarProps { }

export const CartSidebar = ({ }: CartSidebarProps) => {
  const store = useContext(StoreContext);
  const { cartItems, isSidebarOpen } = store.cartSidebarReducer;

  return (
    <ErrorBoundary>
      <CartSidebarWrapper isSidebarOpen={isSidebarOpen}>
        <CartHeading>Shopping Cart</CartHeading>
        {
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.value}
              label={cartItem.label}
              claimedSizes={cartItem.claimedSizes}
            />
          ))
        }
      </CartSidebarWrapper>
    </ErrorBoundary>
  );
};
