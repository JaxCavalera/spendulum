import React, { useContext, useEffect } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';

// Models
import { ProductListActionTypes } from './ProductList-models';
import { ProductInfo } from '../../utils/product-info-helpers';

// Child Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ProductCard } from '../ProductCard/ProductCard';

// Shared Styles
import { SectionParagraph } from '../../utils/shared-styles';

// Styles
import { ProductListWrapper, SpinnerWrapper } from './ProductList-styles';

// Logic
import { refreshProductList } from './ProductList-logic';

export const ProductList = () => {
  const store = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);
  const { productMicroStoreIds } = store.productListStore;

  useEffect(() => {
    // Only  refreshes when the Product List component is mounted
    refreshProductList(productMicroStoreIds, dispatch);
  }, []);

  return (
    <ErrorBoundary>
      <ProductListWrapper isLoading={!productMicroStoreIds.length}>
        {
          !productMicroStoreIds.length ? (
            <SpinnerWrapper>
              <LoadingSpinner msg={'Loading products...'} />
            </SpinnerWrapper>
          ) : (
              productMicroStoreIds.map((productId) => (
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
