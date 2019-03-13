import React from 'react';
import styled from 'styled-components/macro';

import ErrorBoundary from '../../utils/ErrorBoundary';

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Checkout = () => {
  return (
    <ErrorBoundary>
      <CheckoutWrapper>
        Confirm your order at the checkout
      </CheckoutWrapper>
    </ErrorBoundary>
  );
};
