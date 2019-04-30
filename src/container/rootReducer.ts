import { createContext, Dispatch } from 'react';

// Models
import { AccountWidgetReducerState } from '../components/AccountWidget/AccountWidget-models';
import { CartSidebarReducerState } from '../components/CartSidebar/CartSidebar-models';
import { ConfigurationReducerState } from '../components/Configuration/Configuration-models';
import { ProductListReducerState } from '../components/ProductList/ProductList-models';

// Reducer Helpers
import { combineReducers, validateReducers } from '../utils/combineReducers';

// Reducers
import {
  accountWidgetReducer,
  accountWidgetInitialState,
} from '../components/AccountWidget/AccountWidget-reducer';

import {
  cartSidebarReducer,
  cartSidebarInitialState,
} from '../components/CartSidebar/CartSidebar-reducer';

import {
  productListReducer,
  productListInitialState,
} from '../components/ProductList/ProductList-reducer';

import {
  configurationReducer,
  configurationInitialState,
} from '../components/Configuration/Configuration-reducer';

// Root Reducer Models
export interface RootReducerStore {
  accountWidgetStore: AccountWidgetReducerState;
  cartSidebarStore: CartSidebarReducerState;
  configurationStore: ConfigurationReducerState;
  productListStore: ProductListReducerState;
}

export const rootReducerInitialState = (): RootReducerStore => ({
  accountWidgetStore: accountWidgetInitialState,
  cartSidebarStore: cartSidebarInitialState,
  configurationStore: configurationInitialState,
  productListStore: productListInitialState,
});

export const StoreDispatch = createContext({} as Dispatch<any>);
export const StoreContext = createContext(rootReducerInitialState());

// Defines the collection of reducers to be validated
const validReducerCollection = validateReducers({
  accountWidgetStore: accountWidgetReducer,
  cartSidebarStore: cartSidebarReducer,
  configurationStore: configurationReducer,
  productListStore: productListReducer,
});

// Combines validated reducers
export const rootReducer = combineReducers(validReducerCollection);
