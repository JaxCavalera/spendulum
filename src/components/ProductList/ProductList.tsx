import React, { useContext, useEffect } from 'react';

import { mockProductList } from './test/ProductList-mocks';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Store Provider
import { StoreContextLive } from '../../rootReducer';

// Models
import { ProductListActionTypes } from './ProductList-models';
import { ProductInfo } from '../ProductCard/ProductCard-models';

// Child Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ProductCard } from '../ProductCard/ProductCard';

// Shared Styles
import { SectionParagraph } from '../../utils/shared-styles';

// Styles
import { ProductListWrapper, SpinnerWrapper } from './ProductList-styles';

// Logic
import { fetchAvailableProductsList } from './ProductList-async';

export interface ProductListProps { }

export const ProductList: React.FC<ProductListProps> = ({ }) => {
  // Pass down a reference to the storeContext to avoid unnecessary useContext calls on each product card being mapped
  const storeContext = useContext(StoreContextLive);
  const { productList } = storeContext.state.productListReducer;

  // Only runs once due to empy filter array as 2nd param
  useEffect(() => {
    // Fetch available products from the server and update the store when retrieved
    fetchAvailableProductsList()
      .then((newProductList: ProductInfo[]) => {
        // Update the Product List store
        storeContext.dispatch({
          type: ProductListActionTypes.UPDATE_PRODUCT_LIST,
          productList: newProductList,
        });
      })
      .catch((e: Error) => console.log(e));
  }, []);

  return (
    <ErrorBoundary>
      <ProductListWrapper isLoading={!productList.length}>
        {
          !productList.length ? (
            <SpinnerWrapper>
              <LoadingSpinner msg={'Loading products...'} />
            </SpinnerWrapper>
          ) : (
              productList.map(item => (
                <ProductCard
                  key={item.value}
                  data={item}
                  storeContext={storeContext}
                />
              ))
            )
        }
      </ProductListWrapper>
    </ErrorBoundary>
  );
};
