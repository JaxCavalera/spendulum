import { v4 } from 'uuid';

// Models
import { ConfigurationActionTypes } from '../Configuration/Configuration-models';
import { ProductInfo, SizeOptions } from '../../utils/product-info-helpers';
import { ConfigApis } from '../../apis/api-contexts';
import { CartSidebarActionTypes } from '../CartSidebar/CartSidebar-models';

// Testable event handlers
export const handleProdLabelOnChange = (
  setProdLabel: React.Dispatch<React.SetStateAction<string>>,
  newProdLabel: string,
) => {
  setProdLabel(newProdLabel);
};

export const handleImgUrlOnChange = (
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
  newImgUrl: string,
) => {
  setImgUrl(newImgUrl);
};

export const handleMinPriceOnChange = (
  setMinPrice: React.Dispatch<React.SetStateAction<number>>,
  newMinPrice: string,
) => {
  const convertedMinPrice = Number(newMinPrice);

  if (!Number.isNaN(convertedMinPrice)) {
    setMinPrice(convertedMinPrice);
  }
};

export const handleMaxPriceOnChange = (
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>,
  newMaxPrice: string,
) => {
  const convertedMaxPrice = Number(newMaxPrice);

  if (!Number.isNaN(convertedMaxPrice)) {
    setMaxPrice(convertedMaxPrice);
  }
};

export const handleSizeOptionOnChange = (
  setProdSizes: React.Dispatch<React.SetStateAction<SizeOptions>>,
  currentProdSizes: SizeOptions,
  changedSize: string,
  changedSizeStatus: boolean,
) => {
  if (!changedSizeStatus) {
    const { [changedSize]: removedSizeOption, ...remainingSizes } = currentProdSizes;
    setProdSizes(remainingSizes);
    return;
  }

  // Size is being added to the list of available options
  const newProdSizes = {
    ...currentProdSizes,
    [changedSize]: 1,
  };

  setProdSizes(newProdSizes);
};

export const handleSizeOptionQtyOnChange = (
  setProdSizes: React.Dispatch<React.SetStateAction<SizeOptions>>,
  currentProdSizes: SizeOptions,
  changedSize: string,
  newSizeQty: string,
) => {
  setProdSizes({
    ...currentProdSizes,
    [changedSize]: Number(newSizeQty),
  });
};

export const handleSaveOnClick = async (
  dispatch: React.Dispatch<any>,
  configApis: ConfigApis,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>,
  handleProductEditorOnClose: () => void,
  prodLabel: string,
  minPrice: number,
  maxPrice: number,
  prodSizes: SizeOptions,
  cartItemMicroStoreIds: string[],
  imgUrl?: string,
  initialProductData?: ProductInfo,
) => {
  setIsSaving(true);

  const newProductData: ProductInfo = {
    value: v4(),
    claimedSizes: {},
    priceTimer: new Date().toISOString(),
    price: 9001,
    ...typeof initialProductData !== 'undefined' && initialProductData,
    minPrice,
    maxPrice,
    label: prodLabel,
    availableSizes: prodSizes,
    imgUrl,
  };

  try {
    await configApis.postAvailableProducts(newProductData);

    // Remove the updated product from the cart sidebar if found
    const newCartItemMicroStoreIds = cartItemMicroStoreIds.filter(storeId => storeId !== newProductData.value);

    if (newCartItemMicroStoreIds.length !== cartItemMicroStoreIds.length) {
      dispatch({
        type: CartSidebarActionTypes.UPDATE_CART_ITEM_MICROSTORE_ID_LIST,
        cartItemMicroStoreIds: newCartItemMicroStoreIds,
      });

      dispatch({
        type: CartSidebarActionTypes.REMOVE_MICROSTORE,
        cartItemMicroStoreId: newProductData.value,
      });
    }

    // Update both the configuration product list and shop product list microstores to include the new product data
  } catch (error) {
    console.error('Failed to save new product data', error);
  }
};
