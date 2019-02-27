import React, { useContext } from 'react';

import { mockProductList } from './test/ProductList-mocks';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Store Provider
import { StoreContextLive } from '../../rootReducer';

// Child Components
import { ProductCard } from '../ProductCard/ProductCard';

// Shared Styles
import { SectionParagraph } from '../../utils/shared-styles';

// Styles
import { ProductListWrapper } from './ProductList-styles';

// Logic
import { fetchCreateNewProduct } from './ProductList-async';

export interface ProductListProps { }

export const ProductList: React.FC<ProductListProps> = ({ }) => {
  fetchCreateNewProduct({ test: 'some stuff' }).catch((e) => console.log(e));

  // Pass down a reference to the storeContext to avoid unnecessary useContext calls on each product card being mapped
  const storeContext = useContext(StoreContextLive);

  return (
    <ErrorBoundary>
      <ProductListWrapper>
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
