import styled from 'styled-components';

export const colours = {
  black: 'rgb(0, 0, 0)',
  blackOpacity: (opacity: number = 1) => `rgba(0, 0, 0, ${opacity})`,
  white: 'rgb(255, 255, 255)',
  whiteOpacity: (opacity: number = 1) => `rgba(255, 255, 255, ${opacity})`,
  grey1: 'rgb(230, 230, 230)',
  grey5: 'rgb(150, 150, 150)',
  grey8: 'rgb(50, 50, 50)',
  blue3: 'rgb(0, 100, 180)',
  orange6: 'rgb(245, 85, 30)',
};

interface SectionParagraphProps {
  nomargin?: boolean;
}

export const SectionParagraph = styled('p')`
  font-size: 1.4rem;
  color: ${colours.black};
  ${(props: SectionParagraphProps) => props.nomargin ? 'margin: 0' : ''}
`;

export const BasicTextInput = styled.input`
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem;
  border: solid 0.1rem ${colours.grey5};
  background-color: ${colours.whiteOpacity(0.8)};
  border-radius: 0.4rem;
  box-sizing: border-box;

  &:focus {
    background-color: ${colours.white};
  }
`;

export const BasicButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0.5rem;
  background-color: ${colours.whiteOpacity(0.9)};
  border: solid 0.1rem ${colours.grey5};
  border-radius: 0.4rem;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${colours.white};
  }
`;

export const IconButton = styled(BasicButton)`
  width: 4rem;
  margin-left: 1rem;
  padding: 0.3rem;

  > svg {
    height: 100%;
  }
`;

interface WrappedImageProps {
  imgSrc: string;
  imgHeight?: string;
  imgWidth?: string;
}

export const WrappedImage = styled('div')`
  background-image: url(${(props: WrappedImageProps) => props.imgSrc});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: ${(props: WrappedImageProps) => props.imgHeight || 'auto'};
  width: ${(props: WrappedImageProps) => props.imgWidth || 'auto'};
`;
