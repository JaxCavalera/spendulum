import React from 'react';

// Styles
import { Spinner } from './LoadingSpinner-styles';

export interface LoadingSpinnerProps {
  msg?: string;
}

export const LoadingSpinner = ({ msg }: LoadingSpinnerProps) => {
  return (
    <>
      <Spinner />
      {
        msg &&
        <span>{msg}</span>
      }
    </>
  );
};
