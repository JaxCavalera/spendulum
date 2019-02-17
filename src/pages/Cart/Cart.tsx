import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from '../../utils/ErrorBoundary';

const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Cart = () => {
  return (
    <ErrorBoundary>
      <CartWrapper>
        Shopping Cart
      </CartWrapper>
    </ErrorBoundary>
  );
};

export default Cart;
