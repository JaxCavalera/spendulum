import styled from 'styled-components';

// Shared Styles
import { BasicButton, colours } from '../../utils/shared-styles';

// Styled Components
export const AccountWidgetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccountBtn = styled(BasicButton)`
  margin-left: 0.5rem;
`;

interface AccountPanelBackdropProps {
  isShown?: boolean;
}
export const AccountPanelBackdrop = styled.div`
  position: absolute;
  display: ${(props: AccountPanelBackdropProps) => props.isShown ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${colours.blackOpacity(0.4)};
  z-index: 10;
`;

export const AccountPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 23rem;
  width: 48rem;
  background-color: ${colours.white};
  border-radius: 0.4rem;
`;

interface AccountHeaderBtnProps {
  isActive?: boolean;
}
export const AccountHeaderBtn = styled(BasicButton)`
  width: 100%;
  background-color: ${(props: AccountHeaderBtnProps) => props.isActive ? colours.white : colours.grey1};
  font-weight: 600;
  border: none;
  border-radius: 0.4rem 0 0 0;
  cursor: ${(props: AccountHeaderBtnProps) => props.isActive ? 'default' : 'pointer'};

  &:hover {
    background-color: ${colours.whiteOpacity(0.8)};
  }

  &:focus {
    outline: none;
  }

  :last-child {
    border-left: solid 0.2rem ${colours.black};
    border-radius: 0 0.4rem 0 0;
  }
`;

export const AccountPanelHeader = styled.div`
  display: flex;
  justify-content: space-around;
  border-radius: 0.4rem 0.4rem 0 0;
  height: 3rem;
`;

interface TabContentProps {
  isActive?: boolean;
}
export const TabContent = styled.div`
  display: ${(props: TabContentProps) => props.isActive ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const LoginInputs = styled.div`
  width: 75%;

  > input:last-child {
    margin-top: 0.5rem;
  }
`;

export const LoginActions = styled.div`
  display: flex;
  flex-direction: row;

  > button:last-child {
    margin-left: 0.5rem;
  }
`;
