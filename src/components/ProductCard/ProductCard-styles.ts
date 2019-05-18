import styled from 'styled-components/macro';

// Shared styles
import { colours, BasicButton } from '../../utils/shared-styles';

// Styled components
export const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  min-width: 20rem;
  height: 25rem;
  border: solid 0.1rem ${colours.grey5};
  border-radius: 0.4rem;
  margin: 1rem;
  box-sizing: border-box;
`;

export const ImagePanel = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  padding-top: 1rem;
  box-sizing: border-box;
  background-color: ${colours.white};
`;

export const FloatingLabel = styled.p`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  margin: 0;
  background-color: ${colours.blackOpacity(0.5)};
  color: ${colours.white};
  font-weight: 600;
  left: 0;
  bottom: 0;
`;

export const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const PricePanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
`;

export const SizePicker = styled.select`
  height: 3rem;
  width: 100%;
`;

export const AddToCartBtn = styled(BasicButton)`
  justify-content: space-between;
  width: 100%;

  > span {
    width: 100%;
  }

  > svg {
    height: 75%;
    width: 50%;
    fill: ${colours.blue5};
  }

  &:hover > svg {
    fill: ${colours.blueOpacity(0.8)};
  }
`;
