import React from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { SectionParagraph, WrappedImage } from '../../utils/shared-styles';

// Styles
import { ProductCardWrapper, CardActions, AddToCartBtn } from './ProductCard-styles';

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
  const callHandleAddToCartOnClick = () => {
    handleAddToCartOnClick(storeContext, data);
  };

  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
        <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
        <SectionParagraph nomargin={true}>${data.price.toFixed(2)}</SectionParagraph>
        <CardActions>
          <AddToCartBtn onClick={callHandleAddToCartOnClick}>Add to Cart</AddToCartBtn>
        </CardActions>
      </ProductCardWrapper>
    </ErrorBoundary>
  );
};
