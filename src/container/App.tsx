import React, { createContext, useReducer, Dispatch } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Root  Reducer
import {
  rootReducer,
  rootReducerInitialState,
  StoreContext,
  IStoreContext,
} from '../rootReducer';

// Shared Styles
import ErrorBoundary from '../utils/ErrorBoundary';

// Pages
import Browse from '../pages/Browse/Browse';
import Cart from '../pages/Cart/Cart';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

// Components
import LoginWidget from '../components/LoginWidget/LoginWidget';
import CartWidget from '../components/CartWidget/CartWidget';

// Styles
import {
  AppWrapper,
  HeaderBar,
  AppName,
} from './App-styles';

export const App: React.FC = () => {
  const [store, dispatchStore] = useReducer(rootReducer, rootReducerInitialState);
  const initialProviderValue: IStoreContext = {
    state: store,
    dispatch: dispatchStore
  };

  return (
    <ErrorBoundary>
      <StoreContext.Provider value={initialProviderValue}>
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
      </StoreContext.Provider>
    </ErrorBoundary>
  );
};
