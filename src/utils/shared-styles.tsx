import styled from 'styled-components';

export const colours = {
  black: 'rgb(0, 0, 0)',
  blackOpacity: (opacity: number = 1) => `rgba(0, 0, 0, ${opacity})`,
  blue1: 'rgb(247, 251, 255)',
  blue5: 'rgb(0, 100, 180)',
  blueOpacity: (opacity: number = 1) => `rgb(0, 100, 180, ${opacity})`,
  grey1: 'rgb(230, 230, 230)',
  grey5: 'rgb(150, 150, 150)',
  grey8: 'rgb(50, 50, 50)',
  orange1: 'rgb(254, 240, 236)',
  orange4: 'rgb(247, 125, 85)',
  orange5: 'rgb(245, 85, 30)',
  orangeOpacity: (opacity: number = 1) => `rgb(245, 85, 30, ${opacity})`,
  white: 'rgb(255, 255, 255)',
  whiteOpacity: (opacity: number = 1) => `rgba(255, 255, 255, ${opacity})`,
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
  width: 100%;
  padding: 0.5rem;
  border: solid 0.1rem ${colours.grey5};
  background-color: ${colours.orange1};
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
  height: 3rem;
  background-color: ${colours.blue1};
  color: ${colours.black};
  border: solid 0.1rem ${colours.grey5};
  border-radius: 0.4rem;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${colours.white};
  }
`;

export const PrimaryButton = styled(BasicButton)`
  background-color: ${colours.orange5};
  color: ${colours.white};

  &:hover {
    background-color: ${colours.orange4};
  }
`;

interface IconButtonProps {
  disabled?: boolean;
}
export const IconButton = styled(BasicButton)`
  width: 4rem;
  margin-left: 1rem;
  padding: 0.3rem;
  cursor: ${(props: IconButtonProps) => props.disabled ? 'default' : 'pointer'};
  background-color: ${(props: IconButtonProps) => props.disabled && colours.grey5};

  &:hover {
    background-color: ${(props: IconButtonProps) => props.disabled && colours.grey5};
  }

  > svg {
    height: 100%;
    fill: ${(props: IconButtonProps) => props.disabled && colours.grey1};
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
