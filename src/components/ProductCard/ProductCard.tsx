import React, { useState, ChangeEvent, useEffect } from 'react';

// Web Workers
import { WebWorker } from '../../utils/workers/WebWorker';
import { animFrameTimeoutWorker } from '../../utils/workers/anim-frame-timeout';

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
// import { animFrameTimeout } from '../../utils/workers/anim-frame-timeout';

// ProductCard Props
export interface ProductCardProps {
  data: ProductInfo;
  storeContext: StoreContext;
}

const animFrameTimeout = WebWorker(animFrameTimeoutWorker);

export const ProductCard: React.FC<ProductCardProps> = ({ data, storeContext }) => {
  const [selectedSize, updateSelectedSize] = useState(Object.keys(data.availableSizes)[0] || 'Sold Out');
  const [someTxt, updateSomeTxt] = useState('empty');

  const handleSizePickerOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSelectedSize(e.currentTarget.value);
  };

  const callHandleAddToCartOnClick = () => {
    animFrameTimeout.postMessage(data);
    handleAddToCartOnClick(storeContext, data, selectedSize);
  };

  useEffect(() => {
    animFrameTimeout.addEventListener('message', (event: MessageEvent) => {
      console.log('inside the listener');
      if (event.data.value === data.value) {
        updateSomeTxt(event.data.msg);
      }
    })
    // const bail = animFrameTimeout(() => { console.log('got called'); updateSomeTxt('delay over'); }, 3000);
    // bail();
  }, []);

  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
        <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
        <SectionParagraph nomargin={true}>${data.price.toFixed(2)}</SectionParagraph>
        <SectionParagraph>{someTxt}</SectionParagraph>
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
