import React, { useState, MouseEvent } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Shared Styles
import { BasicTextInput, PrimaryButton, BasicButton } from '../../utils/shared-styles';

// Styles
import {
  AccountWidgetWrapper,
  AccountBtn,
  AccountPanel,
  AccountPanelBackdrop,
  AccountPanelHeader,
  AccountHeaderBtn,
  LoginActions,
  LoginInputs,
  TabContent,
} from './AccountWidget-styles';

export interface AccountWidgetProps { }

export const AccountWidget: React.FC<AccountWidgetProps> = ({ }) => {
  const accountPopupClassName = 'account-widget__popup-toggle';
  const [showAccountPanel, updateShowAccountPanel] = useState(false);
  const [loginHasFocus, updateLoginHasFocus] = useState(true);

  const handleAccountBtnOnClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (e.currentTarget.className.match(accountPopupClassName) !== null) {
      updateShowAccountPanel(!showAccountPanel);
    }
  };

  const handleLoginTabOnclick = () => {
    if (!loginHasFocus) {
      updateLoginHasFocus(true);
    }
  };

  const handleSignUpTabOnclick = () => {
    if (loginHasFocus) {
      updateLoginHasFocus(false);
    }
  };

  const ignoreOnClickEvent = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ErrorBoundary>
      <AccountWidgetWrapper>
        <AccountBtn
          className={accountPopupClassName}
          onClick={handleAccountBtnOnClick}
        >
          Account
        </AccountBtn>
        <AccountPanelBackdrop
          className={accountPopupClassName}
          tabIndex={-1}
          isShown={showAccountPanel}
          onClick={handleAccountBtnOnClick}
        >
          <AccountPanel onClick={ignoreOnClickEvent}>
            <AccountPanelHeader>
              <AccountHeaderBtn isActive={!loginHasFocus} onClick={handleSignUpTabOnclick}>Sign Up</AccountHeaderBtn>
              <AccountHeaderBtn isActive={loginHasFocus} onClick={handleLoginTabOnclick}>Login</AccountHeaderBtn>
            </AccountPanelHeader>
            <TabContent isActive={loginHasFocus}>
              <LoginInputs>
                <BasicTextInput placeholder="Username" />
                <BasicTextInput type="password" placeholder="Password" />
              </LoginInputs>
              <LoginActions>
                <PrimaryButton>Login</PrimaryButton>
                <BasicButton className={accountPopupClassName} onClick={handleAccountBtnOnClick}>Cancel</BasicButton>
              </LoginActions>
            </TabContent>
            <TabContent isActive={!loginHasFocus}>Personal accounts coming soon!</TabContent>
          </AccountPanel>
        </AccountPanelBackdrop>
      </AccountWidgetWrapper>
    </ErrorBoundary>
  );
};
