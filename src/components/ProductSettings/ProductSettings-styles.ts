import styled from 'styled-components/macro';

// Shared styles
import { colours, IconButton } from '../../utils/shared-styles';

export const ProductSettingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border: solid 0.15rem ${colours.grey1};
  box-sizing: border-box;

  &:hover {
    background-color: ${colours.blueOpacity(0.015)};
  }
`;

export const ProductActionsPanel = styled.div`
  display: flex;
`;

interface ProductActionBtnProps {
  isWarning?: boolean;
}

export const ProductActionBtn = styled(IconButton)`
  min-height: 3rem;
  width: 3rem;

  > svg {
    fill: ${(props: ProductActionBtnProps) => props.isWarning && colours.red5};
  }
`;
