import {
  AccountWidgetReducerState,
  AccountWidgetReducerAction,
  AccountWidgetActionTypes,
} from './AccountWidget-models';

export const accountWidgetActionTypes: AccountWidgetActionTypes = {};

export const accountWidgetInitialState: AccountWidgetReducerState = {};

export const accountWidgetReducer = (state: AccountWidgetReducerState, action: AccountWidgetReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
