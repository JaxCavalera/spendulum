export const handleQtyInputOnFocus = (
  updateOrderQty: Function,
  updateHasFocus: Function,
  orderQty?: number,
) => {
  if (typeof orderQty === 'undefined') {
    updateOrderQty(0);
  }

  updateHasFocus(true);
};

export const handleQtyInputOnBlur = (
  updateOrderQty: Function,
  updateHasFocus: Function,
  orderQty?: number | string,
) => {
  if (orderQty === 0 || orderQty === '') {
    updateOrderQty(undefined);
  }

  updateHasFocus(false);
};

export const handleQtyInputOnChange = (updateOrderQty: Function, e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value === '' || parseInt(e.target.value, 10) >= 0) {
    updateOrderQty(e.target.value);
  }
};
