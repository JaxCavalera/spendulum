import React, { memo } from 'react';
import styled from 'styled-components';

import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import ProductList from '../../components/ProductList/ProductList';

const BrowseWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Browse = memo(() => {
  console.log('browse page should only call once');
  return (
    <ErrorBoundary>
      <BrowseWrapper>
        <span>Browse Items</span>
        <ProductList />
      </BrowseWrapper>
    </ErrorBoundary>
  );
});

export default Browse;
