import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

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

// Logic
import { validateNewQty } from './CartItemSizeInfo-logic';

// Test Ids
export enum cartItemSizeInfoTestIds {
  CartItemSizeId = 'CartItemSizeInfo/CartItemSizeId',
  CartItemQtyId = 'CartItemSizeInfo/CartItemQty',
}

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
  const cartItemQtyRef = useRef<HTMLInputElement>(null);

  // Local State
  const initialQty = claimedSizes[sizeOption] || 1;
  const [localQty, setLocalQty] = useState(initialQty.toFixed(0));

  // Detect prop changes that need to trigger local state updates
  useEffect(() => {
    const newLocalQty = claimedSizes[sizeOption];
    if (typeof newLocalQty !== 'undefined') {
      setLocalQty(newLocalQty.toFixed(0));
    }
  }, [claimedSizes, sizeOption]);

  // Event Handler Wrappers
  const handleItemQtyOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/(\.|e|\+|-)/.test(e.currentTarget.value)) {
      setLocalQty(e.currentTarget.value);
    }
  };

  const handleItemQtyOnBlur = () => {
    if (typeof availableQty === 'undefined' || !validateNewQty(localQty, initialQty, availableQty)) {
      // Revert the localQty to the last known allowed value (initialQty)
      setLocalQty(initialQty.toFixed(0));
      return;
    }

    // New localQty is valid so pass the change upstream via the onChange handler
    if (itemQtyOnChange) {
      itemQtyOnChange(parseInt(localQty, 10), sizeOption);
    }
  };

  const handleItemQtyOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'enter' && cartItemQtyRef.current !== null) {
      cartItemQtyRef.current.blur();
    }

    if (/(\.|e|\+|-)/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <ErrorBoundary>
      <CartItemSizeInfoWrapper>
        <CartItemSize data-testid={cartItemSizeInfoTestIds.CartItemSizeId}>
          {sizeOption}
        </CartItemSize>
        <CartItemQtyWrapper>
          <span>QTY</span>
          <CartItemQty
            data-testid={cartItemSizeInfoTestIds.CartItemQtyId}
            ref={cartItemQtyRef}
            type="number"
            value={localQty}
            onChange={handleItemQtyOnChange}
            onBlur={handleItemQtyOnBlur}
            onKeyPress={handleItemQtyOnKeyPress}
          />
        </CartItemQtyWrapper>
      </CartItemSizeInfoWrapper>
    </ErrorBoundary>
  );
};
