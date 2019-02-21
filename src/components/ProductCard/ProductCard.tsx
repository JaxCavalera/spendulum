import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';
import {
  colours,
  SectionParagraph,
  WrappedImage,
  BasicButton,
  BasicTextInput,
} from '../../utils/shared-styles';

// Store Constants
import { RootReducerActionTypes, RootReducerAction } from '../../rootReducer';

// Models
import { ProductCardProps } from './ProductCard-models';

// Logic
import {
  handleAddToCartOnClick,
} from './ProductCard-logic';

// Store Provider
import { StoreContext, IStoreContext } from '../../rootReducer';

const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20rem;
  height: 25rem;
  border: solid 0.1rem ${colours.grey5};
  border-radius: 0.4rem;
  margin-left: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 3.5rem;
  background-color: ${colours.grey5};
  margin-top: 1rem;
  padding: 0 0.5rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
`;

const CartInput = styled(BasicTextInput)`
  width: 50%;
  margin-left: 0.5rem;
`;

const ProductCard = ({ data }: ProductCardProps) => {
  const storeContext = useContext(StoreContext);
  console.log(storeContext.state);

  const handleAddToCartOnClick = () => {
    storeContext.dispatch({
      type: RootReducerActionTypes.UPDATE_CART_ITEMS,
      cartItems: [
        ...storeContext.state.cartItems,
        {
          label: data.label,
          value: data.value,
        },
      ],
    });
  };

  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
        <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
        <SectionParagraph nomargin={true}>${data.price.toFixed(2)}</SectionParagraph>
        <CardActions>
          <BasicButton onClick={handleAddToCartOnClick}>Add to Cart</BasicButton>
        </CardActions>
      </ProductCardWrapper>
    </ErrorBoundary>
  );
};

export default ProductCard;
