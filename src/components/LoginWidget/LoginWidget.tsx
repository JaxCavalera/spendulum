import React from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { BasicTextInput } from '../../utils/shared-styles';

// Styles
import { LoginWidgetWrapper, PasswordInput, LoginBtn } from './LoginWidget-styles';

export interface LoginWidgetProps { }

export const LoginWidget = ({ }: LoginWidgetProps) => {
  return (
    <ErrorBoundary>
      <LoginWidgetWrapper>
        <BasicTextInput placeholder="Username" />
        <PasswordInput type="password" placeholder="Password" />
        <LoginBtn>Login</LoginBtn>
      </LoginWidgetWrapper>
    </ErrorBoundary>
  );
};
