import React, { useState } from 'react';

// Error Handling
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
// import { } from './CartItemSizeInfo-models';
import { SizeOptions } from '../ProductCard/ProductCard-models';

// Styles
import {
  CartItemSize,
  CartItemQtyWrapper,
  CartItemQty,
  CartItemSizeInfoWrapper,
} from './CartItemSizeInfo-styles';

// Logic
// import { } from './CartItemSizeInfo-logic';

export interface CartItemSizeInfoProps {
  claimedSizes: SizeOptions;
  sizeOption: string;
  cartItemMicroStoreId: string;
}

export const CartItemSizeInfo = ({
  sizeOption,
  claimedSizes,
  cartItemMicroStoreId,
}: CartItemSizeInfoProps) => {

  return (
    <ErrorBoundary>
      <CartItemSizeInfoWrapper>
        <CartItemSize>{sizeOption}</CartItemSize>
        <CartItemQtyWrapper>
          <span>QTY</span>
          <CartItemQty
            type="number"
            value={claimedSizes[sizeOption]}
            onChange={() => console.log('changed')}
          />
        </CartItemQtyWrapper>
      </CartItemSizeInfoWrapper>
    </ErrorBoundary>
  );
};
