import React, { memo } from 'react';

import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import { ProductList } from '../../components/ProductList/ProductList';

// Styles
import { BrowseWrapper } from './Browse-styles';

export const Browse = memo(() => {
  return (
    <ErrorBoundary>
      <BrowseWrapper>
        <span>Browse Items</span>
        <ProductList />
      </BrowseWrapper>
    </ErrorBoundary>
  );
});
