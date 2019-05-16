// Models
import { ConfigurationActionTypes } from '../Configuration/Configuration-models';
import { ProductInfo, SizeOptions } from '../../utils/product-info-helpers';

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
