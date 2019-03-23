import React from 'react';

// Styles
import { Spinner } from './LoadingSpinner-styles';

export interface LoadingSpinnerProps {
  msg?: string;
}

export enum loadingSpinnerTestIds {
  Spinner = 'LoadingSpinner',
}

export const LoadingSpinner = ({ msg }: LoadingSpinnerProps) => {
  return (
    <>
      <Spinner data-testid={loadingSpinnerTestIds.Spinner} />
      {
        msg &&
        <span>{msg}</span>
      }
    </>
  );
};
