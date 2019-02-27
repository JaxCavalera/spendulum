import styled from 'styled-components';
import { IconButton, colours } from '../../utils/shared-styles';

interface CartButtonProps {
  isSidebarOpen?: boolean;
}
export const CartButton = styled(IconButton)`
  background-color: ${(props: CartButtonProps) => props.isSidebarOpen ? colours.blackOpacity(0.8) : colours.blue1};

  &:hover {
    background-color: ${(props: CartButtonProps) => props.isSidebarOpen ? colours.blackOpacity(0.3) : colours.white};
  }

  > svg {
    fill: ${(props: CartButtonProps) => props.isSidebarOpen ? colours.white : colours.black};
  }
`;
