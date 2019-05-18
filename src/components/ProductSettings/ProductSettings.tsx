import React, { useContext } from 'react';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { ConfigApisContext } from '../../apis/api-contexts';

// images
import { EditIcon, TrashIcon } from '../../images/icons';

// Styles
import { SectionParagraph, SpacedSpan } from '../../utils/shared-styles';
import {
  ProductSettingsWrapper,
  ProductActionsPanel,
  ProductActionBtn,
} from './ProductSettings-styles';
import { handleEditOnClick, handleRemoveOnClick } from './ProductSettings-logic';

export interface ProductSettingsProps {
  data: ProductInfo;
}

export const ProductSettings = ({
  data,
}: ProductSettingsProps) => {
  const {
    label,
    value,
  } = data;

  const {
    cartSidebarStore: {
      cartItemMicroStoreIds,
    },
    productListStore: {
      productMicroStoreIds,
    },
    configurationStore: {
      configProductMicroStoreIds,
    },
  } = useContext(StoreContext);

  const dispatch = useContext(StoreDispatch);
  const configApis = useContext(ConfigApisContext);

  const callHandleEditOnClick = () => {
    handleEditOnClick(dispatch, value);
  };

  const callHandleRemoveOnClick = () => {
    handleRemoveOnClick(
      dispatch,
      configApis,
      cartItemMicroStoreIds,
      productMicroStoreIds,
      configProductMicroStoreIds,
      value,
    );
  };

  return (
    <ProductSettingsWrapper>
      <SectionParagraph marginOverride="0">
        <strong>Product:</strong>
        <SpacedSpan>{label}</SpacedSpan>
      </SectionParagraph>
      <ProductActionsPanel>
        <ProductActionBtn
          title="Edit"
          onClick={callHandleEditOnClick}
        >
          <EditIcon />
        </ProductActionBtn>
        <ProductActionBtn
          isWarning
          title="Remove"
          onClick={callHandleRemoveOnClick}
        >
          <TrashIcon />
        </ProductActionBtn>
      </ProductActionsPanel>
    </ProductSettingsWrapper>
  );
};
