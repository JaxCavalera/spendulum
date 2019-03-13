export const validateNewQty = (
  newQty: string,
  previousQty: number,
  availableQty: number,
) => {
  const convertedQty = parseInt(newQty, 10);
  const totalQty = previousQty + availableQty;

  if (isNaN(convertedQty)) {
    // Failed to convert to a usable number
    return false;
  }

  if (convertedQty < 0) {
    // New quantity is less than the allowed minimum
    return false;
  }

  if (convertedQty > totalQty) {
    // New quantity is greater than the overall total
    return false;
  }

  // Passed all checks so return true
  return true;
};
