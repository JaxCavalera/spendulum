import styled from 'styled-components';
import { colours } from '../../utils/shared-styles';

interface CartSidebarWrapperProps {
  isSidebarOpen?: boolean;
}
export const CartSidebarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  height: 100%;
  background-color: ${colours.grey5};
  overflow-x: hidden;
  box-sizing: border-box;
  transition: linear 0.2s;
  padding: ${(props: CartSidebarWrapperProps) => props.isSidebarOpen ? '1rem' : '1rem 0'};
  width: ${(props: CartSidebarWrapperProps) => props.isSidebarOpen ? '50%' : '0'};
`;

export const CartHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: ${colours.white};
  border-radius: 0.4rem;
  font-weight: 600;
`;

export const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  color: ${colours.blue5};
  background-color: ${colours.blue1};
  border-radius: 0.4rem;
  font-weight: 600;
`;
