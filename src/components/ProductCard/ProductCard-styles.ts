import styled from 'styled-components';

// Shared Styles
import { colours, BasicButton } from '../../utils/shared-styles';

// Styled Components
export const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20rem;
  min-width: 20rem;
  height: 25rem;
  border: solid 0.1rem ${colours.grey5};
  border-radius: 0.4rem;
  margin: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3.5rem;
  margin-top: 1rem;
  padding: 0 0.5rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
`;

export const AddToCartBtn = styled(BasicButton)`
  width: 100%;
`;
