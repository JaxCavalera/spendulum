import React from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
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
