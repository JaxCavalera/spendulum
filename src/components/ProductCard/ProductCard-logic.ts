import { Dispatch } from 'react';
import { ProductCardReducerAction, ProductInfo } from "./ProductCard-models";

// Event Handlers
export const handleAddToCartOnClick = (
  dispatchProductToCart: Dispatch<ProductCardReducerAction>,
  productInfo: ProductInfo,
) => {
  console.log('add to cart was clicked');
};

// MOVE ALL THIS TO THE CART SIDEBAR!!
// export const handleQtyInputOnFocus = (
//   updateOrderQty: Function,
//   updateHasFocus: Function,
//   orderQty?: number,
// ) => {
//   if (typeof orderQty === 'undefined') {
//     updateOrderQty(0);
//   }

//   updateHasFocus(true);
// };

// export const handleQtyInputOnBlur = (
//   updateOrderQty: Function,
//   updateHasFocus: Function,
//   orderQty?: number | string,
// ) => {
//   if (orderQty === 0 || orderQty === '') {
//     updateOrderQty(undefined);
//   }

//   updateHasFocus(false);
// };

// export const handleQtyInputOnChange = (updateOrderQty: Function, e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.value === '' || parseInt(e.target.value, 10) >= 0) {
//     updateOrderQty(e.target.value);
//   }
// };

  // // Listeners
  // useEffect(() => {
  //   updateMaxQty(calculateMaxQty(data.availableSizes, orderInfo));
  // }, [data.availableSizes]);

  // // Callers for event handlers to better support unit testing and debugging
  // const callHandleQtyInputOnFocus = () => {
  //   handleQtyInputOnFocus(updateOrderInfo, updateHasFocus, orderInfo);
  // };

  // const callHandleQtyInputOnBlur = () => {
  //   handleQtyInputOnBlur(updateOrderInfo, updateHasFocus, orderInfo);
  // };

  // const callHandleQtyInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   handleQtyInputOnChange(updateOrderInfo, e);
  // };
