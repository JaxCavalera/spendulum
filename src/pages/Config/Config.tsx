import React, { memo, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext } from '../../container/rootReducer';
import {
  ConfigApisContext,
  configLiveApis,
  // configMockApis,
} from '../../apis/api-contexts';

// Components
import { Configuration } from '../../components/Configuration/Configuration';

// Styles
import { ConfigWrapper } from './Config-styles';

interface ConfigProps {
  history: RouteComponentProps['history'];
  match: RouteComponentProps['match'];
  location: RouteComponentProps['location'];
}

export const Config = memo(({ history, match }: ConfigProps) => {
  const store = useContext(StoreContext);

  if (!store.accountWidgetStore.loggedIn && match.path === '/config') {
    // Redirect unauthenticated users to home page
    history.push('/');
  }

  return (
    <ErrorBoundary>
      <ConfigApisContext.Provider value={configLiveApis()}>
        <ConfigWrapper>
          <Configuration />
        </ConfigWrapper>
      </ConfigApisContext.Provider>
    </ErrorBoundary>
  );
}, (prevProps: ConfigProps, nextProps: ConfigProps) => (
  prevProps.location.pathname === nextProps.location.pathname
));
