import React from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';
import { colours, SectionParagraph } from '../../utils/shared-styles';

// Models
import { ProductCardProps } from './ProductCard-models';

const ProductCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductCard = ({ dispatchProductCardState, productCardState }: ProductCardProps) => {
  return (
    <ErrorBoundary>
      <ProductCardWrapper>
        <SectionParagraph>Clothing Item</SectionParagraph>
      </ProductCardWrapper>
    </ErrorBoundary>
  );
};

export default ProductCard;
