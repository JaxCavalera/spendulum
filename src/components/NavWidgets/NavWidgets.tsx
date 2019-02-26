import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import { CartWidget } from '../CartWidget/CartWidget';
import { CheckoutWidget } from '../CheckoutWidget/CheckoutWidget';

// Styles
import { NavWidgetsWrapper } from './NavWidgets-styles';

export interface NavWidgetsProps { }

export const NavWidgets = ({ }: NavWidgetsProps) => {
  return (
    <ErrorBoundary>
      <NavWidgetsWrapper>
        <CartWidget />
        <CheckoutWidget />
      </NavWidgetsWrapper>
    </ErrorBoundary>
  );
};
