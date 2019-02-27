import styled from 'styled-components';
import { colours } from '../../utils/shared-styles';

export const CartSidebarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  max-width: 25rem;
  height: 100%;
  padding: 1rem;
  background-color: ${colours.grey5};
  box-sizing: border-box;
`;
