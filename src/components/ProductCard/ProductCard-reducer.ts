import {
  ProductCardReducerState,
  ProductCardReducerAction,
  ProductCardActionTypes,
} from './ProductCardmodels';

export const productCardActionTypes: ProductCardActionTypes = {
  UPDATE_ALL_ITEMS: 'productCard/UPDATE_ALL_ITEMS',
  UPDATE_ACTIVE_ITEM_DATA: 'productCard/UPDATE_ACTIVE_ITEM_DATA',
};

export const productCardInitialState: ProductCardReducerState = {
  allProductCards: [],
  activeItemData: undefined,
};

export const productCardReducer = (state: ProductCardReducerState, action: ProductCardReducerAction) => {
  switch (action.type) {
    case productCardActionTypes.UPDATE_ALL_ITEMS:
      return {
        ...state,
        ...action.allProductCards && { allProductCards: action.allProductCards },
      };

    case productCardActionTypes.UPDATE_ACTIVE_ITEM_DATA:
      return {
        ...state,
        ...action.activeItemData && { activeItemData: action.activeItemData },
      };

    default:
      return state;
  }
};
