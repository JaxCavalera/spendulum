// Models
import { ConfigurationActionTypes } from '../Configuration/Configuration-models';
import { ProductInfo } from '../../utils/product-info-helpers';

// Utils
import { deepClone } from '../../utils/deep-clone';

export const updateTempProductStoreData = (
  initialProductData: ProductInfo,
  dispatch: React.Dispatch<any>,
) => {
  const newTempProductData = deepClone(initialProductData);

  dispatch({
    type: ConfigurationActionTypes.ASSIGN_MICROSTORE,
    productMicroStoreId: 'temp',
    productData: newTempProductData,
  });
};
