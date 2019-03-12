import styled from 'styled-components/macro';

// Shared Styles
import { colours } from '../utils/shared-styles';

// Styled Components
export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5rem;
    background-color: ${colours.blue5};
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
  }
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  min-height: 5rem;
  width: 100%;
  max-width: 150rem;
  padding: 1rem;
  background-color: ${colours.blue5};
  box-sizing: border-box;
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 150rem;
  background-color: ${colours.white};
`;

export const AppName = styled.h1`
  font-size: 2rem;
  line-height: 2.8rem;
  margin: 0;
  
  > a {
    color: ${colours.white};
    text-decoration: none;
  }
`;
