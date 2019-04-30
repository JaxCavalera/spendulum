import React, { useReducer } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

// Root Reducer
import {
  rootReducer,
  rootReducerInitialState,
  StoreDispatch,
  StoreContext,
} from './rootReducer';

// Shared Styles
import ErrorBoundary from '../utils/ErrorBoundary';

// Pages
import { Browse } from '../pages/Browse/Browse';
import { Checkout } from '../pages/Checkout/Checkout';
import { Config } from '../pages/Config/Config';
import { PageNotFound } from '../pages/PageNotFound/PageNotFound';

// Components
import { NavWidgets } from '../components/NavWidgets/NavWidgets';
import { CartSidebar } from '../components/CartSidebar/CartSidebar';

// Styles
import {
  AppName,
  AppWrapper,
  HeaderBar,
  PageContent,
} from './App-styles';

export const App = () => {
  const [store, dispatch] = useReducer(rootReducer, rootReducerInitialState());

  return (
    <ErrorBoundary>
      <StoreDispatch.Provider value={dispatch}>
        <StoreContext.Provider value={store}>
          <BrowserRouter>
            <AppWrapper>
              <HeaderBar>
                <AppName>
                  <Link to="/">Spendulum</Link>
                </AppName>
                <Route render={props => <NavWidgets {...props} />} />
              </HeaderBar>
              <PageContent>
                <Switch>
                  <Route exact path="/" component={Browse} />
                  <Route exact path="/checkout" component={Checkout} />
                  <Route exact path="/config" component={Config} />
                  <Route component={PageNotFound} />
                </Switch>
                <CartSidebar />
              </PageContent>
            </AppWrapper>
          </BrowserRouter>
        </StoreContext.Provider>
      </StoreDispatch.Provider>
    </ErrorBoundary>
  );
};
