import styled from 'styled-components/macro';

export const AccountLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;

export const LoginInputs = styled.div`
  width: 75%;

  > input:last-child {
    margin-top: 0.5rem;
  }
`;

export const LoginActions = styled.div`
  display: flex;
  flex-direction: row;

  > button {
    width: 6rem;
  }

  > button:last-child {
    margin-left: 0.5rem;
  }
`;
