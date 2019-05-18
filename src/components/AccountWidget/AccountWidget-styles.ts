import styled from 'styled-components/macro';

// Shared styles
import { BasicButton, colours } from '../../utils/shared-styles';

// Styled components
export const AccountWidgetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > a {
    text-decoration: none;
  }
`;

export const AccountBtn = styled(BasicButton)`
  margin-left: 0.5rem;
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
  background-color: ${(props: AccountHeaderBtnProps) => (props.isActive ? colours.white : colours.grey1)};
  font-weight: 600;
  border: none;
  border-radius: 0.4rem 0 0 0;
  cursor: ${(props: AccountHeaderBtnProps) => (props.isActive ? 'default' : 'pointer')};

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

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
