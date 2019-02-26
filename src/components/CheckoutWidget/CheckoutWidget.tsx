import React from 'react';
import { Link } from 'react-router-dom';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { IconButton } from '../../utils/shared-styles';

// Images
import { CheckoutIcon } from '../../images/icons';

export interface CheckoutWidgetProps { }

export const CheckoutWidget = ({ }: CheckoutWidgetProps) => {
  return (
    <ErrorBoundary>
      <Link to="/checkout">
        <IconButton>
          <CheckoutIcon />
        </IconButton>
      </Link>
    </ErrorBoundary>
  );
};
