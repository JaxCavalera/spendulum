import styled, { css } from 'styled-components/macro';

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
  red5: 'rgb(255, 0, 0)',
  white: 'rgb(255, 255, 255)',
  whiteOpacity: (opacity: number = 1) => `rgba(255, 255, 255, ${opacity})`,
};

interface SectionParagraphProps {
  marginOverride?: string;
}

export const SectionParagraph = styled.p`
  font-size: 1.4rem;
  color: ${colours.black};
  margin: ${(props: SectionParagraphProps) => (
    typeof props.marginOverride !== 'undefined' && props.marginOverride
  )};
`;

export const SpacedSpan = styled.span`
  margin: 0 0.5rem;
`;

export const SpacedStrong = styled.strong`
  margin: 0 0.5rem;
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

export const disabledBtnCss = css`
  background-color: ${colours.grey5};
  color: ${colours.grey1};
  cursor: default;

  &:hover {
    background-color: ${colours.grey5};
  }

  > svg {
    fill: ${colours.grey1};
  }
`;

interface BasicButtonProps {
  disabled?: boolean;
}

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

  ${(props: BasicButtonProps) => props.disabled && disabledBtnCss}
`;

export const PrimaryButton = styled(BasicButton)`
  background-color: ${colours.orange5};
  color: ${colours.white};

  &:hover {
    background-color: ${colours.orange4};
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
