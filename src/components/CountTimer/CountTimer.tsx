import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Models
import {
  CountTimerDirection,
} from './CountTimer-models';

// Styles
import { CountTimerWrapper, TimerInfo } from './CountTimer-styles';

// Logic
import { createTimerManager } from './CountTimer-logic';

export interface CountTimerProps {
  duration: number;
  countDirection?: CountTimerDirection;
  onEnd?: () => void;
}

export const CountTimer = ({ duration, countDirection, onEnd }: CountTimerProps) => {
  const [timer, updateTimer] = useState(duration);

  useEffect(() => {
    if (timer === 0 && onEnd) {
      onEnd();
    }
  }, [timer])

  // Mount / Unmount
  useEffect(() => {
    const clearTimer = createTimerManager(duration, updateTimer, countDirection);

    return () => {
      clearTimer();
    }
  }, [duration]);

  return (
    <ErrorBoundary>
      <CountTimerWrapper>
        <TimerInfo>Price Change In:</TimerInfo>
        <TimerInfo alertMode={true}>{format(timer, 'mm:ss')}</TimerInfo>
      </CountTimerWrapper>
    </ErrorBoundary>
  );
};
