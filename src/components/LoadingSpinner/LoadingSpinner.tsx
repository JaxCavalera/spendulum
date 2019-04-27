import React from 'react';

// Styles
import { Spinner } from './LoadingSpinner-styles';

export interface LoadingSpinnerProps {
  msg?: string;
}

export enum loadingSpinnerTestIds {
  SpinnerId = 'LoadingSpinner/Spinner',
}

export const LoadingSpinner = ({ msg }: LoadingSpinnerProps) => (
  <>
    <Spinner data-testid={loadingSpinnerTestIds.SpinnerId} />
    {
      !!msg && <span>{msg}</span>
    }
  </>
);
