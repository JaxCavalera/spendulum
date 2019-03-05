import { createContext, Dispatch } from 'react';

// Reducer Helpers
import combineReducers, { validateReducers } from '../utils/combineReducers';

// Reducers
import { productListReducer, productListInitialState } from '../components/ProductList/ProductList-reducer';
import { cartSidebarReducer, cartSidebarInitialState } from '../components/CartSidebar/CartSidebar-reducer';

export const rootReducerInitialState = {
  productListReducer: productListInitialState,
  cartSidebarReducer: cartSidebarInitialState,
};

export const StoreDispatch = createContext({} as Dispatch<any>);
export const StoreContext = createContext(rootReducerInitialState);

// Defines the collection of reducers to be validated
const validReducerCollection = validateReducers({
  productListReducer,
  cartSidebarReducer,
});

// Combines validated reducers
export const rootReducer = combineReducers(validReducerCollection);
