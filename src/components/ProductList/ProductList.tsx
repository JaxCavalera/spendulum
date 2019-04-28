import React, { useContext, useEffect, useState } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { BrowseApisContext } from '../../apis/api-contexts';

// Child Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ProductCard } from '../ProductCard/ProductCard';

// Styles
import { ProductListWrapper, SpinnerWrapper } from './ProductList-styles';

// Logic
import { refreshProductList } from './ProductList-logic';

export const ProductList = () => {
  const store = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);
  const browseApis = useContext(BrowseApisContext);
  const { productMicroStoreIds } = store.productListStore;

  const [isLoading, updateIsLoading] = useState(!productMicroStoreIds.length);

  useEffect(() => {
    refreshProductList(productMicroStoreIds, dispatch, browseApis);
    updateIsLoading(false);
  }, [productMicroStoreIds, dispatch, browseApis]);

  return (
    <ErrorBoundary>
      <ProductListWrapper isLoading={isLoading}>
        {
          !productMicroStoreIds.length ? (
            <SpinnerWrapper>
              <LoadingSpinner msg="Loading products..." />
            </SpinnerWrapper>
          ) : (
            productMicroStoreIds.map(productId => (
              <ProductCard
                key={productId}
                data={store.productListStore[productId]}
              />
            ))
          )
        }
      </ProductListWrapper>
    </ErrorBoundary>
  );
};
