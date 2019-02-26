import {
  CheckoutWidgetReducerState,
  CheckoutWidgetReducerAction,
  CheckoutWidgetActionTypes,
} from './CheckoutWidget-models';

export const checkoutWidgetActionTypes: CheckoutWidgetActionTypes = {};

export const checkoutWidgetInitialState: CheckoutWidgetReducerState = {};

export const checkoutWidgetReducer = (state: CheckoutWidgetReducerState, action: CheckoutWidgetReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
