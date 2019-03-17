import styled from 'styled-components/macro';
import { colours, IconButton, SectionParagraph } from '../../utils/shared-styles';

// Styled Components
export const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  color: ${colours.blue5};
  background-color: ${colours.whiteOpacity(0.8)};
  border-radius: 0.4rem;
  font-weight: 600;
  box-sizing: border-box;

  &:first-child {
    margin-top: 0;
  }
`;

export const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CartItemLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2.5rem;
  text-align: center;
  margin: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${colours.blackOpacity(0.5)};
  color: ${colours.white};
  font-weight: 600;
`;

export const CartPricePanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  min-height: 2.5rem;
  margin-top: 0.5rem;
  box-sizing: border-box;
`;

export const TrashIconButton = styled(IconButton)`
  margin: 0.5rem 0 0;
  min-height: 3rem;
  width: 3rem;

  > svg {
    fill: ${colours.red5};
  }
`;
