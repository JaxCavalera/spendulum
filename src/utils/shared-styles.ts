import styled from 'styled-components';

export const colours = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255',
  grey1: 'rgb(230, 230, 230)',
  grey5: 'rgb(150, 150, 150)',
  grey8: 'rgb(50, 50, 50)',
};

export const SectionParagraph = styled.p`
  font-size: 1.4rem;
  color: ${colours.black};
`;

export const TextInput = styled.input`
  display: flex;
  align-items: center;
  height: 2.5rem;
  border: solid 0.1rem ${colours.grey5};
  padding: 0.5rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
`;

export const BasicButton = styled.button`
  display: flex;
  align-items: center;
  height: 2.5rem;
  background-color: ${colours.grey1};
  border: solid 0.1rem ${colours.grey5};
  padding: 0.5rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
`;
