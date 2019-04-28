import React, { memo } from 'react';

import ErrorBoundary from '../../utils/ErrorBoundary';

// API Contexts
import {
  ConfigApisContext,
  // configLiveApis,
  configMockApis,
} from '../../apis/api-contexts';

// Components

// Styles
import { ConfigWrapper } from './Config-styles';

export const Config = memo(() => (
  <ErrorBoundary>
    <ConfigApisContext.Provider value={configMockApis()}>
      <ConfigWrapper>
        <span>Configuration</span>
      </ConfigWrapper>
    </ConfigApisContext.Provider>
  </ErrorBoundary>
));
