import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Shared Styles
import ErrorBoundary from '../utils/ErrorBoundary';
import { SectionParagraph } from '../utils/shared-styles';

// Page Components
import Browse from '../pages/Browse/Browse';
import Cart from '../pages/Cart/Cart';

export const PageNotFound: React.FC = () => (
  <SectionParagraph>The specified page does not exist, check URL</SectionParagraph>
);

export const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/cart" component={Cart} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);
