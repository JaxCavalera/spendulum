import React, { useContext, useState } from 'react';

// Components
import { Modal } from '../Modal/Modal';

// Models
import { ProductInfo, expectedSizeOrder } from '../../utils/product-info-helpers';
import { ConfigurationActionTypes } from '../Configuration/Configuration-models';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { ConfigApisContext } from '../../apis/api-contexts';

// Logic
import {
  handleProdLabelOnChange,
  handleSizeOptionOnChange,
  handleSizeOptionQtyOnChange,
  handleMinPriceOnChange,
  handleMaxPriceOnChange,
  handleImgUrlOnChange,
  handleSaveOnClick,
} from './ProductEditorPopup-logic';

// Styles
import {
  ProductEditorPopupWrapper,
  ProductSizeOption,
  ModalHeading3,
  ProductTextInput,
  ProductSectionPanel,
  ProductSectionLabel,
  ProductSizeTxt,
  ProductSizeCheckbox,
  TextInputWrapper,
  ProductEditorActionsPanel,
} from './ProductEditorPopup-styles';

import {
  PrimaryButton,
  BasicButton,
} from '../../utils/shared-styles';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export interface ProductEditorPopupProps {
  initialProductData?: ProductInfo;
}

export const ProductEditorPopup = ({ initialProductData }: ProductEditorPopupProps) => {
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

  const [isSaving, setIsSaving] = useState(false);

  const [prodLabel, setProdLabel] = useState(
    initialProductData ? initialProductData.label : '',
  );

  const [imgUrl, setImgUrl] = useState(
    (!!initialProductData && initialProductData.imgUrl) || '',
  );

  const [minPrice, setMinPrice] = useState(
    initialProductData ? initialProductData.minPrice : 0,
  );

  const [maxPrice, setMaxPrice] = useState(
    initialProductData ? initialProductData.maxPrice : 0,
  );

  const [prodSizes, setProdSizes] = useState(
    initialProductData ? initialProductData.availableSizes : {},
  );

  // Event handlers
  const callHandleProdLabelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleProdLabelOnChange(setProdLabel, e.target.value);
  };

  const callHandleImgUrlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImgUrlOnChange(setImgUrl, e.target.value);
  };

  const callHandleMinPriceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMinPriceOnChange(setMinPrice, e.target.value);
  };

  const callHandleMaxPriceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMaxPriceOnChange(setMaxPrice, e.target.value);
  };

  const callHandleSizeOptionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSizeOptionOnChange(
      setProdSizes,
      prodSizes,
      e.target.value,
      e.target.checked,
    );
  };

  const callHandleSizeOptionQtyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSizeOptionQtyOnChange(
      setProdSizes,
      prodSizes,
      e.target.name,
      e.target.value,
    );
  };

  const handleProductEditorOnClose = () => {
    // Controls the Modal isOpen state by mounting the correct editor popup component
    dispatch({
      type: ConfigurationActionTypes.UPDATE_ACTIVE_PRODUCT_STORE_ID,
      activeProductStoreId: '',
    });
  };

  const handleCancelOnClick = () => {
    if (!isSaving) {
      handleProductEditorOnClose();
    }
  };

  const callHandleSaveOnClick = () => {
    handleSaveOnClick(
      dispatch,
      configApis,
      setIsSaving,
      handleProductEditorOnClose,
      prodLabel,
      minPrice,
      maxPrice,
      prodSizes,
      cartItemMicroStoreIds,
      productMicroStoreIds,
      configProductMicroStoreIds,
      imgUrl,
      initialProductData,
    );
  };

  return (
    <Modal
      isOpen
      onClose={handleProductEditorOnClose}
    >
      <ProductEditorPopupWrapper>
        <ModalHeading3>Enter Product Details</ModalHeading3>
        <ProductSectionPanel>
          <ProductSectionLabel>Product Label</ProductSectionLabel>
          <ProductTextInput
            value={prodLabel}
            onChange={callHandleProdLabelOnChange}
            placeholder="Name displayed in store"
          />
        </ProductSectionPanel>
        <ProductSectionPanel>
          <ProductSectionLabel>Product Image URL</ProductSectionLabel>
          <ProductTextInput
            value={imgUrl}
            onChange={callHandleImgUrlOnChange}
            placeholder="e.g. https://www.example/product.png"
          />
        </ProductSectionPanel>
        <ProductSectionPanel>
          <ProductSectionLabel>Minimum Sale Price</ProductSectionLabel>
          <TextInputWrapper>
            <span>$</span>
            <ProductTextInput
              type="number"
              value={minPrice || ''}
              onChange={callHandleMinPriceOnChange}
              title="Min sale price"
            />
          </TextInputWrapper>
        </ProductSectionPanel>
        <ProductSectionPanel>
          <ProductSectionLabel>Maximum Sale Price</ProductSectionLabel>
          <TextInputWrapper>
            <span>$</span>
            <ProductTextInput
              type="number"
              value={maxPrice || ''}
              onChange={callHandleMaxPriceOnChange}
              title="Max sale price"
            />
          </TextInputWrapper>
        </ProductSectionPanel>
        <ProductSectionPanel>
          <ProductSectionLabel>Available Sizes (Check all that apply)</ProductSectionLabel>
          {
            expectedSizeOrder.map(size => (
              <ProductSizeOption key={size}>
                <ProductSizeTxt
                  isChecked={typeof prodSizes[size] !== 'undefined'}
                  htmlFor={`product-size-${size}`}
                >
                  <ProductSizeCheckbox
                    id={`product-size-${size}`}
                    type="checkbox"
                    checked={typeof prodSizes[size] !== 'undefined'}
                    onChange={callHandleSizeOptionOnChange}
                    value={size}
                  />
                  <span>{`${size}`}</span>
                </ProductSizeTxt>
                {
                  typeof prodSizes[size] !== 'undefined'
                  && (
                    <ProductTextInput
                      type="number"
                      name={size}
                      placeholder="QTY"
                      value={prodSizes[size] || ''}
                      onChange={callHandleSizeOptionQtyOnChange}
                    />
                  )
                }
              </ProductSizeOption>
            ))
          }
        </ProductSectionPanel>
        <ProductEditorActionsPanel>
          {
            isSaving
            && <LoadingSpinner />
          }
          <PrimaryButton disabled={isSaving} onClick={callHandleSaveOnClick}>
            Save
          </PrimaryButton>
          <BasicButton disabled={isSaving} onClick={handleCancelOnClick}>
            Cancel
          </BasicButton>
        </ProductEditorActionsPanel>
      </ProductEditorPopupWrapper>
    </Modal>
  );
};
