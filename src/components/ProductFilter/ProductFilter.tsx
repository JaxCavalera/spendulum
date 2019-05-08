import React from 'react';

// Error handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared styles
import { SectionParagraph } from '../../utils/shared-styles';

// Styles
import { ProductFilterWrapper } from './ProductFilter-styles';

export interface ProductFilterProps { }

export const ProductFilter = ({ }: ProductFilterProps) => {
  return (
    <ErrorBoundary>
      <ProductFilterWrapper>
        <SectionParagraph>ProductFilter</SectionParagraph>
      </ProductFilterWrapper>
    </ErrorBoundary>
  );
};
