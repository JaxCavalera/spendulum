import React, { useContext } from 'react';

// Contexts
import { StoreDispatch } from '../../container/rootReducer';
import { AccountWidgetActionTypes } from '../AccountWidget/AccountWidget-models';

// Styles
import {
  BasicTextInput,
  PrimaryButton,
  BasicButton,
} from '../../utils/shared-styles';

import {
  AccountLoginWrapper,
  LoginInputs,
  LoginActions,
} from './AccountLogin-styles';

interface AccountLoginProps {
  handleOnClose: () => void;
}

export const AccountLogin = ({ handleOnClose }: AccountLoginProps) => {
  const dispatch = useContext(StoreDispatch);

  const handleLoginOnClick = () => {
    dispatch({
      type: AccountWidgetActionTypes.UPDATE_LOGGED_IN,
      loggedIn: true,
    });

    handleOnClose();
  };

  return (
    <AccountLoginWrapper>
      <LoginInputs>
        <BasicTextInput placeholder="Username - N/A" />
        <BasicTextInput type="password" placeholder="Password - N/A" />
      </LoginInputs>
      <LoginActions>
        <PrimaryButton onClick={handleLoginOnClick}>
      Login
        </PrimaryButton>
        <BasicButton onClick={handleOnClose}>
      Cancel
        </BasicButton>
      </LoginActions>
    </AccountLoginWrapper>
  );
};
