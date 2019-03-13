import { createContext, Dispatch } from 'react';

// Models
import { ProductListReducerState } from '../components/ProductList/ProductList-models';
import { CartSidebarReducerState } from '../components/CartSidebar/CartSidebar-models';

// Reducer Helpers
import combineReducers, { validateReducers } from '../utils/combineReducers';

// Reducers
import { productListReducer, productListInitialState } from '../components/ProductList/ProductList-reducer';
import { cartSidebarReducer, cartSidebarInitialState } from '../components/CartSidebar/CartSidebar-reducer';

// Root Reducer Models
export interface RootReducerStore {
  productListStore: ProductListReducerState;
  cartSidebarStore: CartSidebarReducerState;
}

export const rootReducerInitialState: RootReducerStore = {
  productListStore: productListInitialState,
  cartSidebarStore: cartSidebarInitialState,
};

export const StoreDispatch = createContext({} as Dispatch<any>);
export const StoreContext = createContext(rootReducerInitialState);

// Defines the collection of reducers to be validated
const validReducerCollection = validateReducers({
  productListStore: productListReducer,
  cartSidebarStore: cartSidebarReducer,
});

// Combines validated reducers
export const rootReducer = combineReducers(validReducerCollection);
