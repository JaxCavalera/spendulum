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

export const expectedSizeOrder = ['NA', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const maintainSizeOrder = (a: string, b: string) => {
  const aIndex = expectedSizeOrder.indexOf(a);
  const bIndex = expectedSizeOrder.indexOf(b);

  if (aIndex < bIndex) {
    // Position size A in front of size B
    return -1;
  }

  if (aIndex > bIndex) {
    // Position size B in front of size A
    return 1;
  }

  // Order of sizes will not be changed (unlikely to ever trigger)
  return 0;
};

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
export const updateProductSizes = (
  product: ProductInfo,
  selectedSize: string,
  qty: number,
  isAdded: boolean,
) => {
  if (!verifyItemQtyAdjustment(product, selectedSize, qty, isAdded)) {
    // Avoid updating the product data if an invalid operation was attempted
    return undefined;
  }

  const {
    claimedSizes,
    availableSizes,
  } = product;

  const newClaimedSizes = calculateUpdatedSizes(claimedSizes, selectedSize, qty, isAdded);
  const newAvailableSizes = calculateUpdatedSizes(availableSizes, selectedSize, qty, !isAdded);

  return {
    ...product,
    claimedSizes: newClaimedSizes,
    availableSizes: newAvailableSizes,
  };
};

/**
 * Calculates how many milliseconds are left before the current pricetimer will expire
 * @param dateIsoString - priceTimer on a productInfo data set (in cartSidebar or productList area)
 * @returns number of milliseconds remaining before the current priceTimer expires
 */
export const calculateRemainingPriceDuration = (dateIsoString: string) => {
  const currentTime = new Date();
  const priceDurationTime = new Date(dateIsoString);

  const currentTimeMs = currentTime.getTime();
  const priceTimerMs = priceDurationTime.getTime();

  // Remaining duration should be a positive value if the iso timestamp is still in the future
  const remainingDuration = priceTimerMs - currentTimeMs;
  return (remainingDuration > 0) ? remainingDuration : 0;
};
