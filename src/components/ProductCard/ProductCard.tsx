import React, { useState, ChangeEvent, useEffect, useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';

// Components
import { CountTimer } from '../CountTimer/CountTimer';

// Shared Styles
import { SectionParagraph, WrappedImage } from '../../utils/shared-styles';

// Styles
import { ProductCardWrapper, CardActions, AddToCartBtn, SizePicker } from './ProductCard-styles';

// Models
import { ProductInfo } from './ProductCard-models';

// Logic
import {
  handleAddToCartOnClick,
  calculateRemainingPriceDuration,
  refreshPriceTimerInProductList,
} from './ProductCard-logic';

// ProductCard Props
export interface ProductCardProps {
  data: ProductInfo;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const store = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);

  // Extract consumed store data
  const {
    cartSidebarReducer: {
      cartItems,
    },
    productListReducer: {
      productList,
    },
  } = store;

  // InitialDuration ensures we only calcualte remainingDuration once when the card is mounted
  const initialDuration = -9001;
  const [priceDuration, updatePriceDuration] = useState(initialDuration);
  const [selectedSize, updateSelectedSize] = useState(Object.keys(data.availableSizes)[0] || 'Sold Out');

  const handleSizePickerOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSelectedSize(e.currentTarget.value);
  };

  const callHandleAddToCartOnClick = () => {
    handleAddToCartOnClick(
      data,
      selectedSize,
      cartItems,
      dispatch,
    );
  };

  const handleOnTimerEnd = () => {
    refreshPriceTimerInProductList(data, dispatch, updatePriceDuration);
  };

  useEffect(() => {
    const remainingDuration = calculateRemainingPriceDuration(data.priceTimer);
    updatePriceDuration(remainingDuration);
  }, []);

  return (
    <ErrorBoundary>
      {
        priceDuration !== initialDuration &&
        <ProductCardWrapper>
          <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
          <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
          <CountTimer duration={priceDuration} onEnd={handleOnTimerEnd} />
          <SectionParagraph nomargin={true}>${data.price.toFixed(2)}</SectionParagraph>
          <CardActions>
            <AddToCartBtn onClick={callHandleAddToCartOnClick}>Add to Cart</AddToCartBtn>
            <SizePicker onChange={handleSizePickerOnChange} value={selectedSize}>
              {
                Object.keys(data.availableSizes).map(size => (
                  <option key={size}>{size}</option>
                ))
              }
            </SizePicker>
          </CardActions>
        </ProductCardWrapper>
      }
    </ErrorBoundary>
  );
};
