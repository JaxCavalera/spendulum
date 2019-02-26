import React from 'react';
import { Link } from 'react-router-dom';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { IconButton } from '../../utils/shared-styles';

// Images
import { ShoppingCart } from '../../images/icons';

export interface CartWidgetProps { }

export const CartWidget = ({ }: CartWidgetProps) => {
  return (
    <ErrorBoundary>
      <Link to="/">
        <IconButton>
          <ShoppingCart />
        </IconButton>
      </Link>
    </ErrorBoundary>
  );
};
