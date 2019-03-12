import styled from 'styled-components/macro';
import { colours } from '../../utils/shared-styles';

interface CartSidebarWrapperProps {
  isSidebarOpen?: boolean;
}
export const CartSidebarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  height: 100%;
  background-color: ${colours.grey5};
  box-sizing: border-box;
  transition: linear 0.2s;
  overflow-x: hidden;
  padding: ${(props: CartSidebarWrapperProps) => props.isSidebarOpen ? '1rem' : '1rem 0'};
  width: ${(props: CartSidebarWrapperProps) => props.isSidebarOpen ? '50%' : '0'};
`;

export const CartHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  min-height: 5rem;
  background-color: ${colours.white};
  border-radius: 0.4rem;
  font-weight: 600;
`;

export const CartItemsList = styled.div`
  max-height: 100%;
  margin: 1rem 0;
  overflow-y: auto;
`;
