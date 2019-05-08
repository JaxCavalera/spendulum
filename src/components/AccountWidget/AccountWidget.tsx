import React, { useState, MouseEvent, useContext } from 'react';
import { Link } from 'react-router-dom';

// Error handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { AccountWidgetActionTypes } from './AccountWidget-models';

// Components
import { AccountLogin } from '../AccountLogin/AccountLogin';
import { Modal } from '../Modal/Modal';

// Styles
import {
  AccountWidgetWrapper,
  AccountBtn,
  AccountPanel,
  AccountPanelHeader,
  AccountHeaderBtn,
  TabContent,
} from './AccountWidget-styles';

export const AccountWidget = () => {
  const {
    accountWidgetStore: {
      loggedIn,
    },
  } = useContext(StoreContext);

  const dispatch = useContext(StoreDispatch);

  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [loginHasFocus, setLoginHasFocus] = useState(true);

  const handleOnOpen = () => setShowAccountPanel(true);

  const handleOnClose = () => {
    setShowAccountPanel(false);
  };

  const handleLoginTabOnclick = () => {
    if (!loginHasFocus) {
      setLoginHasFocus(true);
    }
  };

  const handleSignUpTabOnclick = () => {
    if (loginHasFocus) {
      setLoginHasFocus(false);
    }
  };

  const ignoreOnClickEvent = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLogoutOnClick = () => dispatch({
    type: AccountWidgetActionTypes.UPDATE_LOGGED_IN,
    loggedIn: false,
  });

  return (
    <ErrorBoundary>
      <AccountWidgetWrapper>
        {
          loggedIn ? (
            <Link to="/">
              <AccountBtn onClick={handleLogoutOnClick}>
                Logout
              </AccountBtn>
            </Link>
          ) : (
            <AccountBtn onClick={handleOnOpen}>
              Account
            </AccountBtn>
          )
        }
        <Modal isOpen={showAccountPanel} onClose={handleOnClose}>
          <AccountPanel onClick={ignoreOnClickEvent}>
            <AccountPanelHeader>
              <AccountHeaderBtn
                isActive={!loginHasFocus}
                onClick={handleSignUpTabOnclick}
              >
                Sign Up
              </AccountHeaderBtn>
              <AccountHeaderBtn
                isActive={loginHasFocus}
                onClick={handleLoginTabOnclick}
              >
                Login
              </AccountHeaderBtn>
            </AccountPanelHeader>
            {
              loginHasFocus ? (
                <TabContent>
                  <AccountLogin handleOnClose={handleOnClose} />
                </TabContent>
              ) : (
                <TabContent>Personal accounts coming soon!</TabContent>
              )
              }
          </AccountPanel>
        </Modal>
      </AccountWidgetWrapper>
    </ErrorBoundary>
  );
};
