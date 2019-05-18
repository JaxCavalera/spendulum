import React, { useContext } from 'react';

// Error handlers
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

// Test Ids
export enum cartSidebarTestIds {
  CartSidebarId = 'CartSidebar',
}

export const CartSidebar = () => {
  const store = useContext(StoreContext);
  const {
    cartSidebarStore,
    cartSidebarStore: {
      cartItemMicroStoreIds,
      isSidebarOpen,
    },
  } = store;

  return (
    <ErrorBoundary>
      <CartSidebarWrapper
        data-testid={cartSidebarTestIds.CartSidebarId}
        isSidebarOpen={isSidebarOpen}
      >
        <CartHeading>Shopping Cart</CartHeading>
        <CartItemsList>
          {
            cartItemMicroStoreIds.map(cartItemMicroStoreId => (
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
