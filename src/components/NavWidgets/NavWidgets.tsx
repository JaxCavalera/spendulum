import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Components
import { AccountWidget } from '../AccountWidget/AccountWidget';
import { CartWidget } from '../CartWidget/CartWidget';

// Styles
import { IconButton } from '../../utils/shared-styles';
import { NavWidgetsWrapper } from './NavWidgets-styles';
import { CheckoutIcon, HomeIcon } from '../../images/icons';

export const NavWidgets = () => (
  <ErrorBoundary>
    <NavWidgetsWrapper>
      <AccountWidget />
      <Switch>
        <Route exact path="/">
          <>
            <IconButton disabled>
              <HomeIcon />
            </IconButton>
            <Link to="/checkout">
              <IconButton title="Checkout">
                <CheckoutIcon />
              </IconButton>
            </Link>
          </>
        </Route>
        <Route exact path="/checkout">
          <>
            <Link to="/">
              <IconButton title="Shop">
                <HomeIcon />
              </IconButton>
            </Link>
            <IconButton disabled>
              <CheckoutIcon />
            </IconButton>
          </>
        </Route>
      </Switch>
      <CartWidget />
    </NavWidgetsWrapper>
  </ErrorBoundary>
);
