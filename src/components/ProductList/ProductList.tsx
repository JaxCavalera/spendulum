import React, { useContext } from 'react';
import styled from 'styled-components';

import { mockProductList } from './test/ProductList-mocks';

// Store Provider
import { StoreContext } from '../../rootReducer';

// Child Components
import ProductCard from '../ProductCard/ProductCard';

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

const ProductList: React.FC<ProductListProps> = ({ }) => {
  fetchCreateNewProduct({ test: 'some stuff' }).catch((e) => console.log(e));

  const storeContext = useContext(StoreContext);
  console.log('prodlist render');
  return (
    <ErrorBoundary>
      <ProductListWrapper>
        <SectionParagraph>ProductList</SectionParagraph>
        {
          mockProductList.map(item => (
            <ProductCard
              key={item.value}
              data={item}
              storeContext={storeContext}
            />)
          )
        }
      </ProductListWrapper>
    </ErrorBoundary>
  );
};

export default ProductList;
