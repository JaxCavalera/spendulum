import styled from 'styled-components/macro';
import { IconButton, colours } from '../../utils/shared-styles';

interface CartButtonProps {
  isSidebarOpen?: boolean;
  hasItems?: boolean;
}

export const calcSvgFill = (isSidebarOpen?: boolean, hasItems?: boolean) => {
  if (isSidebarOpen) {
    return colours.white;
  }

  if (!isSidebarOpen && !hasItems) {
    return colours.black;
  }

  if (!isSidebarOpen && hasItems) {
    return colours.blue5;
  }
};

export const CartButton = styled(IconButton)`
  background-color: ${(props: CartButtonProps) => props.isSidebarOpen ? colours.blackOpacity(0.8) : colours.blue1};

  &:hover {
    background-color: ${(props: CartButtonProps) => props.isSidebarOpen ? colours.blackOpacity(0.3) : colours.white};
  }

  > svg {
    fill: ${(props: CartButtonProps) => calcSvgFill(props.isSidebarOpen, props.hasItems)};
  }
`;
