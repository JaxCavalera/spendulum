import {
  CartWidgetReducerState,
  CartWidgetReducerAction,
  CartWidgetActionTypes,
} from './CartWidget-models';

export const cartWidgetActionTypes: CartWidgetActionTypes = {};

export const cartWidgetInitialState: CartWidgetReducerState = {};

export const cartWidgetReducer = (state: CartWidgetReducerState, action: CartWidgetReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
