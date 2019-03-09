import React from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { ProductInfo } from '../ProductCard/ProductCard-models';

// Styles
import {
  CartItemWrapper,
  CartItemInfo,
} from './CartItem-styles';

export interface CartItemProps {
  cartItem: ProductInfo;
}

export const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    label,
    claimedSizes,
  } = cartItem;

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
