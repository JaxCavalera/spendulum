import React, { useReducer } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  RouteComponentProps,
} from 'react-router-dom';

// Root  Reducer
import {
  rootReducer,
  rootReducerInitialState,
  StoreContextLive,
  StoreContext,
} from '../rootReducer';

// Shared Styles
import ErrorBoundary from '../utils/ErrorBoundary';

// Pages
import { Browse } from '../pages/Browse/Browse';
import { Checkout } from '../pages/Checkout/Checkout';
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

/**
 * Wrap page components with this if they have children being wrapped by React.memo otherwise props.match will cause
 * unwanted re-renders due to a potential bug in React.memo where the 2nd arg on React.memo ignores the evaluation
 * even if prevProps === nextProps
 */
export const patchWithStableMatchProp = (TargetComponent: React.ComponentType<{ match: RouteComponentProps['match'] }>) => {
  let prevMatch = {} as RouteComponentProps['match'];

  const patchedComponent = (props: RouteComponentProps) => {
    if (JSON.stringify(prevMatch) !== JSON.stringify(props.match)) {
      prevMatch = props.match;
      return <TargetComponent match={props.match} />;
    }

    return <TargetComponent match={prevMatch} />;
  };

  return patchedComponent;
};

// Memo ready patched render functions
const patchedBrowse = patchWithStableMatchProp(Browse);
const patchedCheckout = patchWithStableMatchProp(Checkout);

export const App = () => {
  const [store, dispatchStore] = useReducer(rootReducer, rootReducerInitialState);
  const initialProviderValue: StoreContext = {
    state: store,
    dispatch: dispatchStore
  };

  return (
    <ErrorBoundary>
      <StoreContextLive.Provider value={initialProviderValue}>
        <BrowserRouter>
          <AppWrapper>
            <HeaderBar>
              <AppName>
                <Link to="/">Spendulum</Link>
              </AppName>
              <NavWidgets />
            </HeaderBar>
            <PageContent>
              <Switch>
                <Route exact path="/" render={patchedBrowse} />
                <Route exact path="/checkout" render={patchedCheckout} />
                <Route component={PageNotFound} />
              </Switch>
              <CartSidebar />
            </PageContent>
          </AppWrapper>
        </BrowserRouter>
      </StoreContextLive.Provider>
    </ErrorBoundary>
  );
};
