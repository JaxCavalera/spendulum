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
  alertDuration?: number;
  beforeMsg?: string;
  afterMsg?: string;
  countDirection?: CountTimerDirection;
  onEnd?: () => void;
}

export const CountTimer = ({
  duration,
  alertDuration,
  beforeMsg,
  afterMsg,
  countDirection,
  onEnd,
}: CountTimerProps) => {
  const [isAlert, updateIsAlert] = useState(false);
  const [timer, updateTimer] = useState(duration);

  useEffect(() => {
    if (timer === 0 && onEnd) {
      onEnd();
    }

    if (alertDuration && timer <= alertDuration && !isAlert) {
      updateIsAlert(true);
    }

    if (alertDuration && timer > alertDuration && isAlert) {
      updateIsAlert(false);
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
        {
          beforeMsg &&
          <TimerInfo>{beforeMsg}</TimerInfo>
        }
        <TimerInfo alertMode={isAlert}>{format(timer, 'mm:ss')}</TimerInfo>
        {
          afterMsg &&
          <TimerInfo>{afterMsg}</TimerInfo>
        }
      </CountTimerWrapper>
    </ErrorBoundary>
  );
};
