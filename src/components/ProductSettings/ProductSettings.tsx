import React from 'react';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';

// images
import { EditIcon, TrashIcon } from '../../images/icons';

// Styles
import { SectionParagraph } from '../../utils/shared-styles';
import {
  ProductSettingsWrapper,
  ProductActionsPanel,
  ProductActionBtn,
} from './ProductSettings-styles';

export interface ProductSettingsProps {
  data: ProductInfo;
}

export const ProductSettings = ({
  data,
}: ProductSettingsProps) => {
  const {
    label,
  } = data;

  return (
    <ProductSettingsWrapper>
      <SectionParagraph marginOverride="0">
        {`Product: ${label}`}
      </SectionParagraph>
      <ProductActionsPanel>
        <ProductActionBtn title="Edit">
          <EditIcon />
        </ProductActionBtn>
        <ProductActionBtn title="Remove" isWarning>
          <TrashIcon />
        </ProductActionBtn>
      </ProductActionsPanel>
    </ProductSettingsWrapper>
  );
};
