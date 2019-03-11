import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext } from '../../container/rootReducer';

// Components
import { CartItem } from '../CartItem/CartItem';

// Styles
import {
  CartSidebarWrapper,
  CartHeading,
  CartItemsList,
} from './CartSidebar-styles';

// Logic
import { calcCartTotal } from './CartSidebar-logic';

export interface CartSidebarProps { }

export const CartSidebar = ({ }: CartSidebarProps) => {
  const store = useContext(StoreContext);
  const {
    cartSidebarReducer: cartSidebarStore,
    cartSidebarReducer: {
      cartItemMicroStoreIds,
      isSidebarOpen
    },
  } = store;

  return (
    <ErrorBoundary>
      <CartSidebarWrapper isSidebarOpen={isSidebarOpen}>
        <CartHeading>Shopping Cart</CartHeading>
        <CartItemsList>
          {
            cartItemMicroStoreIds.map((cartItemMicroStoreId) => (
              <CartItem
                key={cartSidebarStore[cartItemMicroStoreId].value}
                cartItem={cartSidebarStore[cartItemMicroStoreId]}
              />
            ))
          }
        </CartItemsList>
        <CartHeading>
          {`Total: $${calcCartTotal(cartSidebarStore, cartItemMicroStoreIds).toFixed(2)}`}
        </CartHeading>
      </CartSidebarWrapper>
    </ErrorBoundary>
  );
};
