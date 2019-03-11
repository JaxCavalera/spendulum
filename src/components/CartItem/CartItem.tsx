import React, { useState } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import { ProductInfo } from '../ProductCard/ProductCard-models';

// Styles
import { SectionParagraph } from '../../utils/shared-styles';
import {
  CartItemWrapper,
  CartItemInfo,
  CartItemContent,
  TrashIconButton,
  CartItemLabel,
  CartPricePanel,
  CartItemSize,
  CartItemQty,
} from './CartItem-styles';

// Components
import { CountTimer } from '../CountTimer/CountTimer';

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

  const initialDuration = -9001;
  const [priceDuration, updatePriceDuration] = useState(initialDuration);

  const handleOnTimerEnd = () => {
    // refreshPriceTimerInProductList(data, dispatch, updatePriceDuration);
    // refreshListedProductPrice(data, dispatch);
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
              <CartItemInfo key={sizeOption}>
                <CartItemSize>{sizeOption}</CartItemSize>
                <CartItemQty
                  value={claimedSizes[sizeOption]}
                  onChange={() => console.log('changed')}
                />
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
