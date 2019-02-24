import {
  ProductCardReducerState,
  ProductCardReducerAction,
} from './ProductCard-models';


export const productCardInitialState: ProductCardReducerState = {
  productList: [],
  activeItemData: undefined,
};

export const productCardReducer = (state: ProductCardReducerState, action: ProductCardReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
