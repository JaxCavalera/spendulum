import React from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';
import { SectionParagraph } from '../../utils/shared-styles';

// Models
import { ProductListProps } from './ProductList-models';

// Logic
import { fetchCreateNewProduct } from './ProductList-async';

const ProductListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductList = ({ }: ProductListProps) => {
  fetchCreateNewProduct({ test: 'some stuff' }).catch((e) => console.log(e));

  return (
    <ErrorBoundary>
      <ProductListWrapper>
        <SectionParagraph>ProductList</SectionParagraph>
      </ProductListWrapper>
    </ErrorBoundary>
  );
};

export default ProductList;
