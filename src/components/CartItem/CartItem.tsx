import React, { useState, useContext, useEffect } from 'react';

// Error handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { ProductInfo, calculateRemainingPriceDuration } from '../../utils/product-info-helpers';
import { StoreContext, StoreDispatch } from '../../container/rootReducer';

// Styles
import { SectionParagraph } from '../../utils/shared-styles';
import {
  CartItemWrapper,
  CartItemContent,
  TrashIconButton,
  CartItemLabel,
  CartPricePanel,
} from './CartItem-styles';

// Components
import { CountTimer } from '../CountTimer/CountTimer';
import { CartItemSizeInfo } from '../CartItemSizeInfo/CartItemSizeInfo';

// Images
import { TrashIcon } from '../../images/icons';

// Logic
import {
  handleItemQtyOnChange,
  removeEmptyClaimedSizes,
  handleTrashBtnOnClick,
  handleTimerOnEnd,
} from './CartItem-logic';

// Test Ids
export enum cartItemTestIds {
  CartItemId = 'CartItem',
  CartItemLabelId = 'CartItem/CartItemLabel',
  TrashIconButtonId = 'CartItem/TrashIconButton',
}

export interface CartItemProps {
  cartItem: ProductInfo;
}

export const CartItem = ({ cartItem }: CartItemProps) => {
  const store = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);

  const {
    availableSizes,
    claimedSizes,
    label,
  } = cartItem;

  const initialDuration = calculateRemainingPriceDuration(cartItem.priceTimer);
  const [priceDuration, setPriceDuration] = useState(initialDuration);

  // Only display sizes with 1 or more qty
  const filteredClaimedSizes = removeEmptyClaimedSizes(claimedSizes);

  const callHandleTimerOnEnd = () => {
    const remainingDuration = calculateRemainingPriceDuration(cartItem.priceTimer);

    if (remainingDuration === 0) {
      handleTimerOnEnd(cartItem, store, dispatch);
    }
  };

  const callHandleItemQtyOnChange = (newQty: number, sizeOption: string) => {
    handleItemQtyOnChange(
      newQty,
      sizeOption,
      cartItem,
      store,
      dispatch,
    );

    if (filteredClaimedSizes.length === 1 && newQty === 0) {
      handleTrashBtnOnClick(
        cartItem,
        store,
        dispatch,
        true,
      );
    }
  };

  const callHandleTrashBtnOnClick = () => {
    handleTrashBtnOnClick(
      cartItem,
      store,
      dispatch,
      false,
    );
  };

  useEffect(() => {
    const newPriceDuration = calculateRemainingPriceDuration(cartItem.priceTimer);
    setPriceDuration(newPriceDuration);
  }, [cartItem.priceTimer]);

  return (
    <ErrorBoundary>
      <CartItemWrapper data-testid={cartItemTestIds.CartItemId}>
        <CartItemLabel data-testid={cartItemTestIds.CartItemLabelId}>{label}</CartItemLabel>
        <CartItemContent>
          <CartPricePanel>
            <SectionParagraph marginOverride="0">
              {`$${cartItem.price.toFixed(2)}`}
            </SectionParagraph>
            <CountTimer
              duration={priceDuration}
              alertDuration={120000}
              onEnd={callHandleTimerOnEnd}
            />
          </CartPricePanel>
          {
            filteredClaimedSizes.map(sizeOption => (
              <CartItemSizeInfo
                key={sizeOption}
                claimedSizes={claimedSizes}
                sizeOption={sizeOption}
                availableQty={availableSizes[sizeOption]}
                itemQtyOnChange={callHandleItemQtyOnChange}
              />
            ))
          }
        </CartItemContent>
        <TrashIconButton
          onClick={callHandleTrashBtnOnClick}
          data-testid={cartItemTestIds.TrashIconButtonId}
        >
          <TrashIcon>
            <title>Remove Item</title>
          </TrashIcon>
        </TrashIconButton>
      </CartItemWrapper>
    </ErrorBoundary>
  );
};
