import React, { memo } from 'react';

import ErrorBoundary from '../../utils/ErrorBoundary';

// API Contexts
import { BrowseApisContext, browseLiveApis } from '../../apis/api-contexts';

// Components
import { ProductList } from '../../components/ProductList/ProductList';

// Styles
import { BrowseWrapper } from './Browse-styles';

export const Browse = memo(() => {
  return (
    <ErrorBoundary>
      <BrowseApisContext.Provider value={browseLiveApis}>
        <BrowseWrapper>
          <span>Browse Items</span>
          <ProductList />
        </BrowseWrapper>
      </BrowseApisContext.Provider>
    </ErrorBoundary>
  );
});
