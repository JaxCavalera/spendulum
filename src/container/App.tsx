import React, { useReducer, Props } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
  match,
} from 'react-router-dom';

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

/**
 * Wrap page components with this if they have children being wrapped by React.memo otherwise props.match will cause unwanted re-renders
 * currently for some reason the 2nd arg on React.memo ignores the evaluation when prevProps === nextProps
 */
export const patchWithStableMatchProp = (TargetComponent: React.ComponentType<{ match: RouteComponentProps['match'] }>) => {
  let prevMatch = {} as RouteComponentProps['match'];

  const patchedComponent: React.FC<RouteComponentProps> = (props) => {
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
const patchedCart = patchWithStableMatchProp(Cart);

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
              <LoginWidget />
              <CartWidget />
            </HeaderBar>
            <Switch>
              <Route exact path="/" render={patchedBrowse} />
              <Route exact path="/cart" render={patchedCart} />
              <Route component={PageNotFound} />
            </Switch>
          </AppWrapper>
        </BrowserRouter>
      </StoreContext.Provider>
    </ErrorBoundary>
  );
};
