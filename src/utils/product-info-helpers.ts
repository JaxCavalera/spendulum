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


export const verifyItemQtyAdjustment = (
  targetItem: ProductInfo,
  selectedSize: string,
  requestedQty: number,
  isAdded: boolean,
) => {
  const availableQty = targetItem.availableSizes[selectedSize] || 0;
  const claimedQty = targetItem.claimedSizes[selectedSize] || 0;
  const totalQty = availableQty + claimedQty;

  const newClaimedQty = isAdded ? (claimedQty + requestedQty) : (claimedQty - requestedQty);

  if (newClaimedQty < 0 || newClaimedQty > totalQty) {
    return false;
  }

  // The requestedQty matches 0, totalQty or falls somewhere in between the two
  return true;
};

export const calculateUpdatedSizes = (
  existingSizes: SizeOptions,
  selectedSize: string,
  requestedQty: number,
  isAdded: boolean,
): SizeOptions => {
  const { [selectedSize]: existingQty, ...otherSizes } = existingSizes;

  // New size being added to the sizeCollection
  if (typeof existingQty === 'undefined') {
    return {
      ...otherSizes,
      [selectedSize]: requestedQty,
    };
  }

  const newQty = isAdded ? (existingQty + requestedQty) : (existingQty - requestedQty);

  return {
    ...otherSizes,
    [selectedSize]: newQty,
  };
};

/**
 * Updates quantity related details for the specified product
 * @param product - Details for the product being adjusted
 * @param selectedSize - References the name of a sizeOption that needs a qty adjustment
 * @param qty - Number of items in the selectedSize to be added / subtracted
 * @param isAdded - True when the qty is being added to claimedSizes[selectedSize]
 * @returns - Updated copy of the provided product info
 */
export const updateProductSizes = (product: ProductInfo, selectedSize: string, qty: number, isAdded: boolean) => {
  if (!verifyItemQtyAdjustment(product, selectedSize, qty, isAdded)) {
    // Avoid updating the product data if an invalid operation was attempted
    return;
  }

  const newClaimedSizes = calculateUpdatedSizes(product.claimedSizes, selectedSize, qty, isAdded);
  const newAvailableSizes = calculateUpdatedSizes(product.availableSizes, selectedSize, qty, !isAdded);

  return {
    ...product,
    claimedSizes: newClaimedSizes,
    availableSizes: newAvailableSizes,
  };
};