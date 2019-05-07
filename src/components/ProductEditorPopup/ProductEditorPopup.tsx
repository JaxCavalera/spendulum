import React, { useContext } from 'react';

// Models
import { ProductInfo } from '../../utils/product-info-helpers';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
// import { ConfigApisContext } from '../../apis/api-contexts';

// Logic
import { updateTempProductStoreData } from './ProductEditorPopup-logic';

export interface ProductEditorPopupProps {
  initialProductData: ProductInfo;
}

export const ProductEditorPopup = ({ initialProductData }: ProductEditorPopupProps) => {
  const {
    configurationStore: {
      temp,
    },
  } = useContext(StoreContext);
  const dispatch = useContext(StoreDispatch);
  // const configApis = useContext(ConfigApisContext);
  updateTempProductStoreData(initialProductData, dispatch);

  return (
    <div>
      {temp.label}
    </div>
  );
};
