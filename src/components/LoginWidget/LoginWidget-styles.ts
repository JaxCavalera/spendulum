import styled from 'styled-components';

// Shared Styles
import { BasicTextInput, BasicButton, colours } from '../../utils/shared-styles';

// Styled Components
export const LoginWidgetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PasswordInput = styled(BasicTextInput)`
  margin-left: 0.5rem;
`;

export const LoginBtn = styled(BasicButton)`
  margin-left: 0.5rem;
`;
