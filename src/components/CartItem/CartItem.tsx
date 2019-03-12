import React, { useState, useContext, useEffect } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { ProductInfo, SizeOptions } from '../../utils/product-info-helpers';

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
import { handleItemQtyOnChange } from './CartItem-logic';
import { StoreContext, StoreDispatch } from '../../container/rootReducer';

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

  const initialDuration = -9001;
  const [priceDuration, updatePriceDuration] = useState(initialDuration);

  const handleOnTimerEnd = () => {
    // refreshPriceTimerInProductList(data, dispatch, updatePriceDuration);
    // refreshListedProductPrice(data, dispatch);
  };

  const callHandleItemQtyOnChange = (newQty: number, sizeOption: string) => {
    handleItemQtyOnChange(
      newQty,
      sizeOption,
      cartItem,
      store,
      dispatch,
    );
  };

  return (
    <ErrorBoundary>
      <CartItemWrapper>
        <CartItemLabel>{label}</CartItemLabel>
        <CartItemContent>
          <CartPricePanel>
            <SectionParagraph nomargin={true}>${cartItem.price.toFixed(2)}</SectionParagraph>
            <CountTimer duration={priceDuration} alertDuration={120000} onEnd={handleOnTimerEnd} />
          </CartPricePanel>
          {
            Object.keys(claimedSizes).map(sizeOption => (
              <CartItemSizeInfo
                key={sizeOption}
                availableQty={availableSizes[sizeOption] || 0}
                claimedSizes={claimedSizes}
                minQty={1}
                sizeOption={sizeOption}
                itemQtyOnChange={callHandleItemQtyOnChange}
              />
            ))
          }
        </CartItemContent>
        <TrashIconButton>
          <TrashIcon>
            <title>Remove Item</title>
          </TrashIcon>
        </TrashIconButton>
      </CartItemWrapper>
    </ErrorBoundary>
  );
};
