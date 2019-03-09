import React from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { ProductInfo } from '../ProductCard/ProductCard-models';

// Styles
import {
  CartItemWrapper,
  CartItemInfo,
  CartItemContent,
  TrashIconButton,
} from './CartItem-styles';

// Images
import { TrashIcon } from '../../images/icons';

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
        <CartItemContent>
          <CartItemInfo>{label}</CartItemInfo>
          {
            Object.keys(claimedSizes).map(sizeOption => (
              <CartItemInfo key={sizeOption}>
                {sizeOption} : {claimedSizes[sizeOption]}
              </CartItemInfo>
            ))
          }
        </CartItemContent>
        <TrashIconButton>
          <TrashIcon />
        </TrashIconButton>
      </CartItemWrapper>
    </ErrorBoundary>
  );
};
