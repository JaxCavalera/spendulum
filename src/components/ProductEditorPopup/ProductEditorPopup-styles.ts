import styled from 'styled-components/macro';

// Shared styles
import { colours } from '../../utils/shared-styles';

export const ProductEditorPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  min-width: 40rem;
  max-width: 100rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${colours.white};
`;

export const ModalHeading3 = styled.h3`
  margin: 0 0 1rem;
`;

export const InputLabelTxt = styled.span`
  margin-right: 0.5rem;
`;

export const ProductSizeOption = styled.div`
  display: flex;
  flex-direction: row;
`;
