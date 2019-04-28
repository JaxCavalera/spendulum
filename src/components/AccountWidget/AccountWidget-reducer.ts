import {
  AccountWidgetReducerState,
  AccountWidgetReducerAction,
  AccountWidgetActionTypes,
} from './AccountWidget-models';

export const accountWidgetInitialState: AccountWidgetReducerState = {
  loggedIn: false,
};

export const accountWidgetReducer = (
  state: AccountWidgetReducerState,
  action: AccountWidgetReducerAction,
) => {
  switch (action.type) {
    case AccountWidgetActionTypes.UPDATE_LOGGED_IN: {
      return {
        ...state,
        ...typeof action.loggedIn !== 'undefined' && {
          loggedIn: action.loggedIn,
        },
      };
    }

    default:
      return state;
  }
};
