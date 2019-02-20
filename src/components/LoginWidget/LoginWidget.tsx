import React from 'react';
import styled from 'styled-components';

// Shared Styles
import ErrorBoundary from '../../utils/ErrorBoundary';
import {
  BasicButton,
  BasicTextInput,
} from '../../utils/shared-styles';

// Models
import { LoginWidgetProps } from './LoginWidget-models';

// Styles
export const LoginWidgetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PasswordInput = styled(BasicTextInput)`
  margin-left: 0.5rem;
`;

export const LoginBtn = styled(BasicButton)`
  margin-left: 1rem;
`;

const LoginWidget = ({ }: LoginWidgetProps) => {
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

export default LoginWidget;
