import {
  LoginWidgetReducerState,
  LoginWidgetReducerAction,
  LoginWidgetActionTypes,
} from './LoginWidget-models';

export const loginWidgetActionTypes: LoginWidgetActionTypes = {};

export const loginWidgetInitialState: LoginWidgetReducerState = {};

export const loginWidgetReducer = (state: LoginWidgetReducerState, action: LoginWidgetReducerAction) => {
  switch (action.type) {

    default:
      return state;
  }
};
