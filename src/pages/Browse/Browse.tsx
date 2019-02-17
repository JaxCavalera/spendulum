import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import ProductList from '../../components/ProductList/ProductList';

const BrowseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Browse = () => {
  return (
    <ErrorBoundary>
      <BrowseWrapper>
        Browse Clothing Items
        <ProductList />
      </BrowseWrapper>
    </ErrorBoundary>
  );
};

export default Browse;
