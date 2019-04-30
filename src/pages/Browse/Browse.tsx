import React, { memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ErrorBoundary from '../../utils/ErrorBoundary';

// API Contexts
import {
  BrowseApisContext,
  // browseLiveApis,
  browseMockApis,
} from '../../apis/api-contexts';

// Components
import { ProductList } from '../../components/ProductList/ProductList';

// Styles
import { BrowseWrapper } from './Browse-styles';

export const Browse = memo(() => (
  <ErrorBoundary>
    <BrowseApisContext.Provider value={browseMockApis()}>
      <BrowseWrapper>
        <span>Browse Items</span>
        <ProductList />
      </BrowseWrapper>
    </BrowseApisContext.Provider>
  </ErrorBoundary>
), (prevProps: RouteComponentProps, nextProps: RouteComponentProps) => (
  prevProps.location.pathname === nextProps.location.pathname
));
