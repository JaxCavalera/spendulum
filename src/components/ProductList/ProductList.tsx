import React, { useContext } from 'react';

// Error handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { BrowseApisContext } from '../../apis/api-contexts';

// Child Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ProductCard } from '../ProductCard/ProductCard';

// Styles
import { ProductListWrapper } from './ProductList-styles';

// Logic
import { useGetAvailableProducts } from './ProductList-logic';


export const ProductList = () => {
  const {
    productListStore,
    productListStore: {
      productMicroStoreIds,
    },
  } = useContext(StoreContext);

  const dispatch = useContext(StoreDispatch);
  const browseApis = useContext(BrowseApisContext);
  const isLoading = useGetAvailableProducts(dispatch, browseApis, productListStore);

  return (
    <ErrorBoundary>
      <ProductListWrapper isLoading={isLoading}>
        {
          isLoading ? (
            <LoadingSpinner msg="Loading available products..." />
          ) : (
            productMicroStoreIds.map(productId => (
              <ProductCard
                key={productId}
                data={productListStore[productId]}
              />
            ))
          )
        }
      </ProductListWrapper>
    </ErrorBoundary>
  );
};
