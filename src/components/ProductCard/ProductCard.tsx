import React, { useState, ChangeEvent, useEffect } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import { CountTimer } from '../CountTimer/CountTimer';

// Shared Styles
import { SectionParagraph, WrappedImage } from '../../utils/shared-styles';

// Styles
import { ProductCardWrapper, CardActions, AddToCartBtn, SizePicker } from './ProductCard-styles';

// Models
import { ProductInfo } from './ProductCard-models';
import { StoreContext } from '../../rootReducer';

// Logic
import {
  handleAddToCartOnClick,
  calculateRemainingPriceDuration,
  refreshPriceTimerInProductList,
} from './ProductCard-logic';

// ProductCard Props
export interface ProductCardProps {
  cardIndex: number;
  data: ProductInfo;
  storeContext: StoreContext;
}

export const ProductCard: React.FC<ProductCardProps> = ({ cardIndex, data, storeContext }) => {
  const [priceDuration, updatePriceDuration] = useState(calculateRemainingPriceDuration(data.priceTimer));
  const [selectedSize, updateSelectedSize] = useState(Object.keys(data.availableSizes)[0] || 'Sold Out');

  const handleSizePickerOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSelectedSize(e.currentTarget.value);
  };

  const callHandleAddToCartOnClick = () => {
    handleAddToCartOnClick(storeContext, data, selectedSize, cardIndex);
  };

  useEffect(() => {
    if (!priceDuration) {
      const newDuration = refreshPriceTimerInProductList(storeContext, data, cardIndex);
      updatePriceDuration(newDuration);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
        <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
        <CountTimer duration={priceDuration} />
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
    </ErrorBoundary>
  );
};
