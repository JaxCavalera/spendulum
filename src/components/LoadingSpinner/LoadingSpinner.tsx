import React from 'react';

// Styles
import { Spinner, SpinnerWrapper } from './LoadingSpinner-styles';

export interface LoadingSpinnerProps {
  msg?: string;
}

export enum loadingSpinnerTestIds {
  SpinnerId = 'LoadingSpinner/Spinner',
}

export const LoadingSpinner = ({ msg }: LoadingSpinnerProps) => (
  <SpinnerWrapper>
    <Spinner data-testid={loadingSpinnerTestIds.SpinnerId} />
    {
      !!msg && <span>{msg}</span>
    }
  </SpinnerWrapper>
);
