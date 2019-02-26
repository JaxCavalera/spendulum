import styled from 'styled-components';

// Shared Styles
import { colours } from '../utils/shared-styles';

// Styled Components
export const AppWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 1rem;
  background-color: ${colours.blue3};
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  margin-left: 1rem;
`;

export const AppName = styled.h1`
  font-size: 2rem;
  line-height: 2.8rem;
  margin: 0;
  color: ${colours.white};
`;
