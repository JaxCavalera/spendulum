import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import ProductList from '../../components/ProductList/ProductList';

const BrowseWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Browse = () => {
  return (
    <ErrorBoundary>
      <BrowseWrapper>
        <span>Browse Clothing Items</span>
        <ProductList />
      </BrowseWrapper>
    </ErrorBoundary>
  );
};

export default Browse;
