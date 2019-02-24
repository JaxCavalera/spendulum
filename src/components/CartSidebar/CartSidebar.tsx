import React from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { CartSidebarProps } from './CartSidebar-models';

const CartSidebarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartSidebar = ({ }: CartSidebarProps) => {
  return (
    <ErrorBoundary>
      <CartSidebarWrapper>
        Cart Items Go Here
      </CartSidebarWrapper>
    </ErrorBoundary>
  );
};

export default CartSidebar;
