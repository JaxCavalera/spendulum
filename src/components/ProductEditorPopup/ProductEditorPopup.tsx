import React, { useContext, useState, useReducer } from 'react';

// Components
import { Modal } from '../Modal/Modal';

// Models
import { ProductInfo, expectedSizeOrder } from '../../utils/product-info-helpers';
import { ConfigurationActionTypes } from '../Configuration/Configuration-models';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
// import { ConfigApisContext } from '../../apis/api-contexts';

// Logic
import {
  handleProdLabelOnChange,
  handleSizeOptionOnChange,
  handleSizeOptionQtyOnChange,
} from './ProductEditorPopup-logic';

// Styles
import {
  ProductEditorPopupWrapper,
  InputLabelTxt,
  ProductSizeOption,
  ModalHeading3,
} from './ProductEditorPopup-styles';

export interface ProductEditorPopupProps {
  initialProductData?: ProductInfo;
}

export const ProductEditorPopup = ({ initialProductData }: ProductEditorPopupProps) => {
  const dispatch = useContext(StoreDispatch);
  // const configApis = useContext(ConfigApisContext);

  const [showModal, setShowModal] = useState(true);
  const [prodLabel, setProdLabel] = useState(
    initialProductData ? initialProductData.label : '',
  );

  const [prodSizes, setProdSizes] = useState(
    initialProductData ? initialProductData.availableSizes : {},
  );

  // Event handlers
  const callHandleProdLabelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleProdLabelOnChange(setProdLabel, e.target.value);
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
    dispatch({
      type: ConfigurationActionTypes.UPDATE_ACTIVE_PRODUCT_STORE_ID,
      activeProductStoreId: '',
    });

    setShowModal(false);
  };

  return (
    <Modal
      onClose={handleProductEditorOnClose}
      isOpen={showModal}
    >
      <ProductEditorPopupWrapper>
        <ModalHeading3>Enter Product Details</ModalHeading3>
        <label htmlFor="product-label">
          <InputLabelTxt>Product Label:</InputLabelTxt>
          <input
            id="product-label"
            value={prodLabel}
            onChange={callHandleProdLabelOnChange}
            placeholder="Public facing product label"
          />
        </label>
        <InputLabelTxt>Available Sizes: (Check all that apply)</InputLabelTxt>
        {
          expectedSizeOrder.map(size => (
            <ProductSizeOption key={size}>
              <label htmlFor={`product-size-${size}`}>
                <InputLabelTxt>{`${size}:`}</InputLabelTxt>
                <input
                  id={`product-size-${size}`}
                  type="checkbox"
                  checked={typeof prodSizes[size] !== 'undefined'}
                  onChange={callHandleSizeOptionOnChange}
                  value={size}
                />
              </label>
              {
                typeof prodSizes[size] !== 'undefined'
                && (
                  <input
                    type="number"
                    name={size}
                    placeholder="QTY"
                    value={prodSizes[size]}
                    onChange={callHandleSizeOptionQtyOnChange}
                  />
                )
              }
            </ProductSizeOption>
          ))
        }
      </ProductEditorPopupWrapper>
    </Modal>
  );
};
