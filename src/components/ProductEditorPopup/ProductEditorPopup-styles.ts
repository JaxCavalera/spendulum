import styled, { css } from 'styled-components/macro';

// Shared styles
import { colours } from '../../utils/shared-styles';

export const ProductEditorPopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  min-width: 40rem;
  max-width: 100rem;
  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${colours.white};
`;

export const ModalHeading3 = styled.h3`
  margin: 0 0 1rem;
`;

interface ProductSizeTxtProps {
  isChecked?: boolean;
}

const enabledCheckboxCss = css`
  content: '';
  position: absolute;
  display: block;
  height: 1rem;
  width: 1rem;
  min-width: 1rem;
  margin-left: 0.5rem;
  background-color: ${colours.grey8};
`;

export const ProductSizeTxt = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 7rem;
  width: 7rem;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    height: 2rem;
    width: 2rem;
    min-width: 2rem;
    margin-right: 0.5rem;
    box-sizing: border-box;
    border: solid 0.2rem ${colours.grey8};
    background-color: ${colours.white};
  }

  &::after {
    ${(props: ProductSizeTxtProps) => (!!props.isChecked && enabledCheckboxCss)}
  }

  > span {
    width: 100%;
    margin-right: 0.5rem;
  }
`;

export const ProductSizeCheckbox = styled.input`
  position: absolute;
  left: -100vw;
  opacity: 0;
`;

export const ProductSectionPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductSectionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ProductSizeOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  background-color: ${colours.grey1};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductTextInput = styled.input`
  width: 100%;
  padding: 0.25rem;
  box-sizing: border-box;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    margin-right: 0.25rem;
  }
`;

export const ProductEditorActionsPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;

  > button {
    width: 6rem;
    min-width: 6rem;
  }

  > button:last-child {
    margin-left: 0.5rem;
  }
`;
