import React from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { SectionParagraph } from '../../utils/shared-styles';

// Models
import { SizeOptions } from '../ProductCard/ProductCard-models';

// Styles
import {
  CartItemWrapper,
  CartItemInfo,
} from './CartItem-styles';

export interface CartItemProps {
  label: string;
  claimedSizes: SizeOptions
}

export const CartItem = ({ label, claimedSizes }: CartItemProps) => {
  return (
    <ErrorBoundary>
      <CartItemWrapper>
        <CartItemInfo>{label}</CartItemInfo>
        {
          Object.keys(claimedSizes).map(sizeOption => (
            <CartItemInfo key={sizeOption}>
              {sizeOption} : {claimedSizes[sizeOption]}
            </CartItemInfo>
          ))
        }
      </CartItemWrapper>
    </ErrorBoundary>
  );
};
