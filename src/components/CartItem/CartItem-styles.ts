import styled from 'styled-components';
import { colours } from '../../utils/shared-styles';

// Styled Components
export const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  color: ${colours.blue5};
  background-color: ${colours.blue1};
  border-radius: 0.4rem;
  font-weight: 600;
`;

export const CartItemInfo = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
`;
