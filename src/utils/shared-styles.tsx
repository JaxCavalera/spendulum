import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import { url } from 'inspector';

export const colours = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255',
  grey1: 'rgb(230, 230, 230)',
  grey5: 'rgb(150, 150, 150)',
  grey8: 'rgb(50, 50, 50)',
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
