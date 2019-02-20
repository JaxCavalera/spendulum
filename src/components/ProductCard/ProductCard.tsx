import React, { useState } from 'react';
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

// Models
import { ProductCardProps } from './ProductCard-models';

// Logic
import {
  handleQtyInputOnFocus,
  handleQtyInputOnBlur,
  handleQtyInputOnChange,
} from './ProductCard-logic';

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

const QtyInput = styled(BasicTextInput)`
  width: 50%;
  margin-left: 0.5rem;
`;

const ProductCard = ({ data }: ProductCardProps) => {
  const [orderQty, updateOrderQty] = useState(undefined);
  const [hasFocus, updateHasFocus] = useState(false);

  // Callers for event handlers to better support unit testing and debugging
  const callHandleQtyInputOnFocus = () => {
    handleQtyInputOnFocus(updateOrderQty, updateHasFocus, orderQty);
  };

  const callHandleQtyInputOnBlur = () => {
    handleQtyInputOnBlur(updateOrderQty, updateHasFocus, orderQty);
  };

  const callHandleQtyInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQtyInputOnChange(updateOrderQty, e);
  };

  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph nomargin={true}>{data.label}</SectionParagraph>
        <WrappedImage imgSrc={data.imgUrl || ''} imgHeight={'100%'} imgWidth={'100%'} />
        <SectionParagraph nomargin={true}>${data.price.toFixed(2)}</SectionParagraph>
        <CardActions>
          <BasicButton>Add to cart</BasicButton>
          <QtyInput
            min={0}
            onFocus={callHandleQtyInputOnFocus}
            onBlur={callHandleQtyInputOnBlur}
            type={orderQty ? 'number' : 'text'}
            value={typeof orderQty !== 'undefined' ? orderQty : 'QTY'}
            onChange={callHandleQtyInputOnChange}
          />
        </CardActions>
      </ProductCardWrapper>
    </ErrorBoundary>
  );
};

export default ProductCard;
