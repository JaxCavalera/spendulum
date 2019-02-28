import styled, { keyframes } from 'styled-components';

export const rotateSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(365deg);
  }
`;


export const Spinner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 1rem;
  border: solid 0.2rem #a2a1a1;
  border-radius: 100%;


  &::before {
    content: "";
    position: absolute;
    display: block;
    height: 1.65rem;
    width: 1.5rem;
    border-top: solid 0.22rem #565555;
    border-radius: 50%;
    animation: ${rotateSpinner} 1s infinite linear;
  }
`;
