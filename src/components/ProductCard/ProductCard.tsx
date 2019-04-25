import React, {
  useState, ChangeEvent, useEffect, useContext,
} from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';

// Components
import { CountTimer } from '../CountTimer/CountTimer';

// Shared Styles
import { SectionParagraph, WrappedImage } from '../../utils/shared-styles';

// Styles
import {
  ProductCardWrapper,
  CardActions,
  AddToCartBtn,
  SizePicker,
  ImagePanel,
  FloatingLabel,
  PricePanel,
} from './ProductCard-styles';

// Utils
import {
  ProductInfo,
  calculateRemainingPriceDuration,
  maintainSizeOrder,
} from '../../utils/product-info-helpers';

// Logic
import {
  handleAddToCartOnClick,
  handleProductTimerOnEnd,
} from './ProductCard-logic';

// Images
import { ShoppingCart } from '../../images/icons';

// Test Ids
export enum productCardTestIds {
  AddToCartBtnId = 'productCard/AddToCartBtn',
  FloatingLabelId = 'productCard/FloatingLabel',
  ProductCardWrapperId = 'productCard/ProductCardWrapper',
}

// ProductCard Props
export interface ProductCardProps {
  data: ProductInfo;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const store = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);

  // Extract consumed store data
  const {
    cartSidebarStore,
    cartSidebarStore: {
      cartItemMicroStoreIds,
    },
  } = store;

  // Negative InitialDuration ensures remainingDuration only calcuates once when the card is mounted
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
      cartItemMicroStoreIds,
      cartSidebarStore,
      dispatch,
    );
  };

  const callHandleProductTimerOnEnd = () => {
    handleProductTimerOnEnd(data, dispatch);
  };

  useEffect(() => {
    const remainingDuration = calculateRemainingPriceDuration(data.priceTimer);

    if (priceDuration !== remainingDuration) {
      updatePriceDuration(remainingDuration);
    }
  }, [data.priceTimer]);

  return (
    <ErrorBoundary>
      {
        priceDuration !== initialDuration && (
          <ProductCardWrapper data-testid={productCardTestIds.ProductCardWrapperId}>
            <ImagePanel>
              <WrappedImage imgSrc={data.imgUrl || ''} imgHeight="100%" imgWidth="100%" />
              <FloatingLabel data-testid={productCardTestIds.FloatingLabelId}>
                {data.label}
              </FloatingLabel>
            </ImagePanel>
            <CardActions>
              <PricePanel>
                <SectionParagraph nomargin>
                  {data.price.toFixed(2)}
                </SectionParagraph>
                <CountTimer
                  duration={priceDuration}
                  alertDuration={120000}
                  onEnd={callHandleProductTimerOnEnd}
                />
              </PricePanel>
              <SizePicker onChange={handleSizePickerOnChange} value={selectedSize}>
                {
                  Object.keys(data.availableSizes).sort(maintainSizeOrder).map(size => (
                    <option key={size} value={size}>
                      {`Size ${size} [${data.availableSizes[size]} Available]`}
                    </option>
                  ))
                }
              </SizePicker>
              <AddToCartBtn
                data-testid={productCardTestIds.AddToCartBtnId}
                onClick={callHandleAddToCartOnClick}
              >
                <span>Add to Cart</span>
                {
                  !!data.claimedSizes[selectedSize] && (
                    <ShoppingCart>
                      <title>In Cart</title>
                    </ShoppingCart>
                  )
                }
              </AddToCartBtn>
            </CardActions>
          </ProductCardWrapper>
        )
      }
    </ErrorBoundary>
  );
};
