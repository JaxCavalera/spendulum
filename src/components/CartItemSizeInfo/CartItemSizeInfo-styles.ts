import styled from 'styled-components/macro';

// Shared Styles
import { colours } from '../../utils/shared-styles';

export const CartItemSizeInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0.5rem 0;
`;

export const CartItemSize = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
  width: 50%;
  margin-right: 1rem;
`;

export const CartItemQtyWrapper = styled.div`
  width: 50%;
`;

export const CartItemQty = styled.input`
  width: 50%;
  height: 2rem;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
  outline: none;
  border: dashed 0.1rem ${colours.black};
  border-radius: 0.4rem;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: ${colours.whiteOpacity(0.4)};
  }

  &:focus {
    border: solid 0.1rem ${colours.black};
    background-color: ${colours.white};
    cursor: text;
  }
`;
