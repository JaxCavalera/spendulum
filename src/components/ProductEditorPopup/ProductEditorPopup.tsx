import React, { useContext, useEffect, useState } from 'react';

// Components
import { Modal } from '../Modal/Modal';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';
import { ConfigurationActionTypes } from '../Configuration/Configuration-models';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
// import { ConfigApisContext } from '../../apis/api-contexts';

// Logic
import { updateTempProductStoreData } from './ProductEditorPopup-logic';

export interface ProductEditorPopupProps {
  initialProductData: ProductInfo;
}

export const ProductEditorPopup = ({ initialProductData }: ProductEditorPopupProps) => {
  const [showModal, setShowModal] = useState(true);

  const {
    configurationStore: {
      temp,
    },
  } = useContext(StoreContext);
  
  const dispatch = useContext(StoreDispatch);
  // const configApis = useContext(ConfigApisContext);

  useEffect(() => {
    updateTempProductStoreData(initialProductData, dispatch);
  }, [initialProductData, dispatch]);

  // Event handlers
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
      temp popup
      {temp.label}
    </Modal>
  );
};
