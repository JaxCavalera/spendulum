import React, { useContext, useEffect } from 'react';

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

export const ProductList = ({ }: ProductListProps) => {
  // Pass down a reference to the storeContext to avoid unnecessary useContext calls on each product card being mapped
  const storeContext = useContext(StoreContextLive);
  const { productList } = storeContext.state.productListReducer;

  useEffect(() => {
    // This can be replaced with periodic productList updates once using live data that is updated
    if (!productList.length) {
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
    }
  }, []);

  console.log(productList.length);

  return (
    <ErrorBoundary>
      <ProductListWrapper isLoading={!productList.length}>
        {
          !productList.length ? (
            <SpinnerWrapper>
              <LoadingSpinner msg={'Loading products...'} />
            </SpinnerWrapper>
          ) : (
              productList.map((item, cardIndex) => (
                <ProductCard
                  key={item.value}
                  cardIndex={cardIndex}
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
