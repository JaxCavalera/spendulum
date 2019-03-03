import React, { useState, ChangeEvent } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { SectionParagraph, WrappedImage } from '../../utils/shared-styles';

// Styles
import { ProductCardWrapper, CardActions, AddToCartBtn, SizePicker } from './ProductCard-styles';

// Models
import { ProductInfo } from './ProductCard-models';
import { StoreContext } from '../../rootReducer';

// Logic
import { handleAddToCartOnClick } from './ProductCard-logic';

// ProductCard Props
export interface ProductCardProps {
  data: ProductInfo;
  storeContext: StoreContext;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, storeContext }) => {
  const [selectedSize, updateSelectedSize] = useState(Object.keys(data.availableSizes)[0] || 'Sold Out');

  const handleSizePickerOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSelectedSize(e.currentTarget.value);
  };

  const callHandleAddToCartOnClick = () => {
    handleAddToCartOnClick(storeContext, data, selectedSize);
  };

  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
        <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
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
