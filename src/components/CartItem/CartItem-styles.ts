import styled from 'styled-components';
import { colours, IconButton } from '../../utils/shared-styles';

// Styled Components
export const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  color: ${colours.blue5};
  background-color: ${colours.blue1};
  border-radius: 0.4rem;
  font-weight: 600;
  box-sizing: border-box;
`;

export const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartItemInfo = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
`;

export const TrashIconButton = styled(IconButton)`
  width: 3rem;

  > svg {
    fill: ${colours.red5};
  }
`;
