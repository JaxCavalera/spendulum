import {
  ProductListReducerState,
  ProductListReducerAction,
  ProductListActionTypes,
} from './ProductList-models';

export const productListInitialState: ProductListReducerState = {
  productList: [],
};

export const productListReducer = (
  state: ProductListReducerState,
  action: ProductListReducerAction,
): ProductListReducerState => {
  switch (action.type) {
    case ProductListActionTypes.UPDATE_PRODUCT_LIST:
      return {
        ...state,
        ...action.productList && { productList: action.productList },
      };

    default:
      return state;
  }
};
