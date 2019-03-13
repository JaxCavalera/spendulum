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
  claimedSizes: SizeOptions;
  sizeOption: string;
  availableQty?: number;
  itemQtyOnChange?: (newQty: number, sizeOption: string) => void;
}

export const CartItemSizeInfo = ({
  claimedSizes,
  sizeOption,
  availableQty,
  itemQtyOnChange,
}: CartItemSizeInfoProps) => {
  // Local State
  const initialQty = claimedSizes[sizeOption] || 1;
  const [localQty, updateLocalQty] = useState(initialQty.toFixed(0));

  // Detect prop changes that need to trigger local state updates
  useEffect(() => {
    const newLocalQty = claimedSizes[sizeOption];
    if (typeof newLocalQty !== 'undefined' && newLocalQty.toFixed(0) !== localQty) {
      updateLocalQty(newLocalQty.toFixed(0));
    }
  }, [claimedSizes]);

  // Event Handler Wrappers
  const handleItemQtyOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateLocalQty(e.currentTarget.value);
  };

  const handleItemQtyOnBlur = () => {
    if (typeof availableQty === 'undefined' || !validateNewQty(localQty, initialQty, availableQty)) {
      // Revert the localQty to the last known allowed value (initialQty)
      updateLocalQty(initialQty.toFixed(0));
      return;
    }

    // New localQty is valid so pass the change upstream via the onChange handler
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
