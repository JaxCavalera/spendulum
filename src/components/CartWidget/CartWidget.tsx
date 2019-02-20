import React from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';
import { SectionParagraph } from '../../utils/shared-styles';

// Images
import { ShoppingCart } from '../../images/icons';

// Models
import { CartWidgetProps } from './CartWidget-models';

const CartWidgetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartWidget = ({ }: CartWidgetProps) => {
  return (
    <ErrorBoundary>
      <CartWidgetWrapper>
        <ShoppingCart />
      </CartWidgetWrapper>
    </ErrorBoundary>
  );
};

export default CartWidget;
