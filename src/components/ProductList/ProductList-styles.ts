import styled from 'styled-components';

export interface ProductListWrapperProps {
  isLoading?: boolean;
}

export const ProductListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: ${(props: ProductListWrapperProps) => props.isLoading && '100%'};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
