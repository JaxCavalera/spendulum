import React, { useState, ChangeEvent, useEffect } from 'react';

// Error Handling
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { SizeOptions } from '../../utils/product-info-helpers';

// Styles
import {
  CartItemSize,
  CartItemQtyWrapper,
  CartItemQty,
  CartItemSizeInfoWrapper,
} from './CartItemSizeInfo-styles';
import { validateNewQty } from './CartItemSizeInfo-logic';

export interface CartItemSizeInfoProps {
  availableQty: number,
  claimedSizes: SizeOptions;
  minQty: number,
  sizeOption: string;
  itemQtyOnChange?: (newQty: number, sizeOption: string) => void;
}

export const CartItemSizeInfo = ({
  availableQty,
  claimedSizes,
  minQty,
  sizeOption,
  itemQtyOnChange,
}: CartItemSizeInfoProps) => {
  // Local State
  const initialQty = claimedSizes[sizeOption] || 1;
  const [localQty, updateLocalQty] = useState(initialQty.toFixed(0));

  // Detect prop changes that need to trigger local state updates
  useEffect(() => {
    const propsQty = claimedSizes[sizeOption];
    if (typeof propsQty !== 'undefined' && propsQty.toFixed(0) !== localQty) {
      updateLocalQty(propsQty.toFixed(0));
    }
  }, [claimedSizes]);

  // Event Handler Wrappers
  const handleItemQtyOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateLocalQty(e.currentTarget.value);
  };

  const handleItemQtyOnBlur = () => {
    if (!validateNewQty(localQty, initialQty, minQty, availableQty)) {
      // Reset the localQty back to the initial value as the current localQty is invalid
      updateLocalQty(initialQty.toFixed(0));
      return;
    }

    // localQty is valid so pass up a change event to the parent if a handler was provided via props
    if (itemQtyOnChange) {
      itemQtyOnChange(parseInt(localQty, 10), sizeOption);
    }
  };

  return (
    <ErrorBoundary>
      <CartItemSizeInfoWrapper>
        <CartItemSize>{sizeOption}</CartItemSize>
        <CartItemQtyWrapper>
          <span>QTY</span>
          <CartItemQty
            type="number"
            value={localQty}
            onChange={handleItemQtyOnChange}
            onBlur={handleItemQtyOnBlur}
          />
        </CartItemQtyWrapper>
      </CartItemSizeInfoWrapper>
    </ErrorBoundary>
  );
};
