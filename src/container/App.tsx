import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../utils/ErrorBoundary';
import { SectionParagraph } from '../utils/shared-styles';

// Pages
import Browse from '../pages/Browse/Browse';
import Cart from '../pages/Cart/Cart';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

// Components
import LoginWidget from '../components/LoginWidget/LoginWidget';
import CartWidget from '../components/CartWidget/CartWidget';

// Styles
export const AppWrapper = styled.div`
  margin: 1rem;
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AppName = styled.h1`
  font-size: 2rem;
  line-height: 2.8rem;
  margin: 0;
`;

export const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AppWrapper>
        <HeaderBar>
          <AppName>Spendulum</AppName>
          <CartWidget />
          <LoginWidget />
        </HeaderBar>
        <Switch>
          <Route exact path="/" component={Browse} />
          <Route exact path="/cart" component={Cart} />
          <Route component={PageNotFound} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  </ErrorBoundary>
);
