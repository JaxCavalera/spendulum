import React, { useEffect } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import {
  CountTimerDirection,
} from './CountTimer-models';

// Styles
import { CountTimerWrapper } from './CountTimer-styles';

// Logic
import { timer } from './CountTimer-logic';

export interface CountTimerProps {
  duration: number;
  countDirection?: CountTimerDirection;
  onEnd?: () => void;
}

export const CountTimer: React.FC<CountTimerProps> = () => {
  useEffect(() => {
    // start up a timer
  }, []);

  return (
    <ErrorBoundary>
      <CountTimerWrapper>Count Timer Placeholder</CountTimerWrapper>
    </ErrorBoundary>
  );
};
