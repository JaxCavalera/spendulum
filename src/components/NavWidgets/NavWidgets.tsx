import React, { useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext } from '../../container/rootReducer';

// Components
import { AccountWidget } from '../AccountWidget/AccountWidget';
import { CartWidget } from '../CartWidget/CartWidget';

// Styles
import { IconButton } from '../../utils/shared-styles';
import { NavWidgetsWrapper } from './NavWidgets-styles';

// Images
import {
  CheckoutIcon,
  ConfigIcon,
  HomeIcon,
} from '../../images/icons';

export interface NavWidgetsProps {
  location: RouteComponentProps['location'];
}

export const NavWidgets = ({ location }: NavWidgetsProps) => {
  const store = useContext(StoreContext);
  const {
    loggedIn,
  } = store.accountWidgetStore;

  const routePath = location.pathname;

  return (
    <ErrorBoundary>
      <NavWidgetsWrapper>
        <AccountWidget />
        {
          loggedIn
          && (
            <Link to="/config">
              <IconButton title="Config" disabled={routePath === '/config'}>
                <ConfigIcon />
              </IconButton>
            </Link>
          )
        }
        <Link to="/">
          <IconButton title="Shop" disabled={routePath === '/'}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/checkout">
          <IconButton title="Checkout" disabled={routePath === '/checkout'}>
            <CheckoutIcon />
          </IconButton>
        </Link>
        <CartWidget />
      </NavWidgetsWrapper>
    </ErrorBoundary>
  );
};
