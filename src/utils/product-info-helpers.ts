// Project wide helpers for managing data in objects that are based on the ProductInfo interface

// Models
export interface SizeOptions {
  [key: string]: number | undefined;
  NA?: number;
  XXS?: number;
  XS?: number;
  S?: number;
  M?: number;
  L?: number;
  XL?: number;
  XXL?: number;
  XXXL?: number;
}

export interface ProductInfo {
  availableSizes: SizeOptions;
  claimedSizes: SizeOptions;
  label: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  priceTimer: string;
  value: string;
  imgUrl?: string;
}


export const verifyItemHasEnoughQty = (
  targetItem: ProductInfo,
  selectedSize: string,
  requestedQty: number,
) => {
  const availableQty = targetItem.availableSizes[selectedSize] || 0;
  const claimedQty = targetItem.claimedSizes[selectedSize] || 0;
  const totalQty = availableQty + claimedQty;

  if (availableQty - requestedQty < 0) {
    // Prevents taking more qty out of the cart than were available
    return false;
  }

  if (requestedQty > availableQty) {
    // Prevent adding more than the available qty to the cart
    return false;
  }

  return true;
};

export const calculateClaimedSizes = (
  existingClaimedSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
) => {
  const existingQty = existingClaimedSizes[selectedSize];
  const combinedQty = typeof existingQty !== 'undefined' && (existingQty + requestedQty);

  const updatedClaimedSizes: SizeOptions = {
    ...existingClaimedSizes,
    [selectedSize]: combinedQty || requestedQty,
  };

  return updatedClaimedSizes;
};

export const calculateAvailableSizes = (
  existingAvailableSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
) => {
  const existingAvailableQty = existingAvailableSizes[selectedSize];
  const newAvailableQty = typeof existingAvailableQty !== 'undefined' && (existingAvailableQty - requestedQty);

  // Typescript compiler limitation workaround - default to 0
  const updatedAvailableSizes: SizeOptions = {
    ...existingAvailableSizes,
    [selectedSize]: newAvailableQty || 0,
  };

  return updatedAvailableSizes;
};

/**
 * Updates quantity related details for the specified product
 * @param product - Details for the product represented by this productCard
 * @param selectedSize - Property referencing an availablesize on this productCard to b eadded to the cart
 * @param qty - Number of items in the selectedSize to be added to the cart
 * @returns - Updated copy of the provided product
 */
export const updateProductData = (product: ProductInfo, selectedSize: string, qty: number) => {
  if (!verifyItemHasEnoughQty(product, selectedSize, qty)) {
    // Avoid updating the product data if it doesn't have enough of the selectedSize available
    return;
  }

  const newClaimedSizes = calculateClaimedSizes(product.claimedSizes, selectedSize, qty);
  const newAvailableSizes = calculateAvailableSizes(product.availableSizes, selectedSize, qty);

  return {
    ...product,
    claimedSizes: newClaimedSizes,
    availableSizes: newAvailableSizes,
  };
};
