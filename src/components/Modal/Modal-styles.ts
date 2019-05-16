import styled from 'styled-components/macro';
import { colours } from '../../utils/shared-styles';

export const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${colours.blackOpacity(0.3)};
  overflow-y: auto;
  z-index: 10;
`;

export const ModalContentWrapper = styled.div`
  max-height: 100vh;
  margin: 0;
`;
