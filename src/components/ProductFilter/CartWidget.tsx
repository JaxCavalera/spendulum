import React from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';
import { SectionParagraph } from '../../utils/shared-styles';

// Models
import { ProductFilterProps } from './ProductFilter-models';

const ProductFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductFilter = ({ }: ProductFilterProps) => {
  return (
    <ErrorBoundary>
      <ProductFilterWrapper>
        <SectionParagraph>ProductFilter</SectionParagraph>
      </ProductFilterWrapper>
    </ErrorBoundary>
  );
};

export default ProductFilter;
