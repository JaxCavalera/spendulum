import { createContext } from 'react';

// Reducer Helpers
import combineReducers, { validateReducers } from './utils/combineReducers';

// Reducers
import { productListReducer, productListInitialState } from './components/ProductList/ProductList-reducer';
import { cartSidebarReducer, cartSidebarInitialState } from './components/CartSidebar/CartSidebar-reducer';

// Models
export interface RootReducerAction {
  [type: string]: any;
}

export const rootReducerInitialState = {
  productListReducer: productListInitialState,
  cartSidebarReducer: cartSidebarInitialState,
};

export interface StoreContext {
  state: typeof rootReducerInitialState;
  dispatch: React.Dispatch<RootReducerAction>;
}

export const StoreContextLive = createContext<StoreContext>({
  state: rootReducerInitialState,
  dispatch: () => undefined,
});

// Defines the collection of reducers to be validated
const validReducerCollection = validateReducers({
  productListReducer,
  cartSidebarReducer,
});

// Combines validated reducers
export const rootReducer = combineReducers(validReducerCollection);
