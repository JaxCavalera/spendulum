import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
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

export const soldOutTxt = 'Sold Out';

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

  const initialDuration = calculateRemainingPriceDuration(data.priceTimer);
  const [priceDuration, updatePriceDuration] = useState(initialDuration);
  const [selectedSize, updateSelectedSize] = useState(
    Object.keys(data.availableSizes)[0] || soldOutTxt,
  );

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
    const remainingDuration = calculateRemainingPriceDuration(data.priceTimer);

    if (remainingDuration === 0) {
      handleProductTimerOnEnd(data, dispatch);
    }
  };

  useEffect(() => {
    const newDuration = calculateRemainingPriceDuration(data.priceTimer);
    updatePriceDuration(newDuration);
  }, [data.priceTimer]);

  const sizeOptions = Object.keys(data.availableSizes).sort(maintainSizeOrder);

  return (
    <ErrorBoundary>
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
              {`$${data.price.toFixed(2)}`}
            </SectionParagraph>
            <CountTimer
              duration={priceDuration}
              alertDuration={300000}
              onEnd={callHandleProductTimerOnEnd}
            />
          </PricePanel>
          <SizePicker
            onChange={handleSizePickerOnChange}
            value={selectedSize}
          >
            {
              sizeOptions.length ? (
                sizeOptions.map(size => (
                  <option key={size} value={size}>
                    {`Size ${size} [${data.availableSizes[size]} Available]`}
                  </option>
                ))
              ) : <option value={soldOutTxt}>Sold Out</option>
            }
          </SizePicker>
          <AddToCartBtn
            data-testid={productCardTestIds.AddToCartBtnId}
            onClick={callHandleAddToCartOnClick}
            disabled={selectedSize === soldOutTxt}
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
    </ErrorBoundary>
  );
};
