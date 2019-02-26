import styled from 'styled-components';
import { colours } from '../../utils/shared-styles';

export const CartSidebarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  background-color: ${colours.blackOpacity(0.4)};
  border-radius: 0.4rem;
`;
