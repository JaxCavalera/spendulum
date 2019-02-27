import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import { AccountWidget } from '../AccountWidget/AccountWidget';
import { CartWidget } from '../CartWidget/CartWidget';

// Styles
import { IconButton } from '../../utils/shared-styles';
import { NavWidgetsWrapper } from './NavWidgets-styles';
import { CheckoutIcon, HomeIcon } from '../../images/icons';

export interface NavWidgetsProps { }

export const NavWidgets = ({ }: NavWidgetsProps) => {
  return (
    <ErrorBoundary>
      <NavWidgetsWrapper>
        <AccountWidget />
        <Link to="/">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/checkout">
          <IconButton>
            <CheckoutIcon />
          </IconButton>
        </Link>
        <CartWidget />
      </NavWidgetsWrapper>
    </ErrorBoundary>
  );
};
