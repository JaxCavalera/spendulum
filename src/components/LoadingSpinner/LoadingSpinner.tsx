import React from 'react';

// Styles
import { Spinner } from './LoadingSpinner-styles';

export interface LoadingSpinnerProps {
  msg?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ msg }) => {
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
