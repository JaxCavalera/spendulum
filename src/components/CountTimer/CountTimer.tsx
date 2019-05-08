import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

// Error handlers
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
  const [isAlert, setIsAlert] = useState(false);
  const [timer, setTimer] = useState(duration);

  if (duration === 0 && onEnd) {
    onEnd();
  }

  useEffect(() => {
    if (timer === 0 && onEnd) {
      onEnd();
    }
  }, [timer, onEnd]);

  useEffect(() => {
    if (alertDuration && timer <= alertDuration && !isAlert) {
      setIsAlert(true);
    }

    if (alertDuration && timer > alertDuration && isAlert) {
      setIsAlert(false);
    }
  }, [timer, alertDuration, isAlert]);

  // Mount / Unmount
  useEffect(() => {
    const clearTimer = createTimerManager(duration, setTimer, countDirection);

    return () => {
      clearTimer();
    };
  }, [duration, setTimer, countDirection]);

  return (
    <ErrorBoundary>
      <CountTimerWrapper>
        {
          beforeMsg
          && <TimerInfo>{beforeMsg}</TimerInfo>
        }
        <TimerInfo alertMode={isAlert}>{format(timer, 'mm:ss')}</TimerInfo>
        {
          afterMsg
          && <TimerInfo>{afterMsg}</TimerInfo>
        }
      </CountTimerWrapper>
    </ErrorBoundary>
  );
};
