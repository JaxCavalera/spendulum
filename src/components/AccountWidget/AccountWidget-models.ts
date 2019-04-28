export enum AccountWidgetActionTypes {
  UPDATE_LOGGED_IN = 'accountWidget/UPDATE_LOGGED_IN',
}

export interface AccountWidgetReducerAction {
  type: string;
  loggedIn?: boolean;
}

export interface AccountWidgetReducerState {
  loggedIn: boolean;
}
