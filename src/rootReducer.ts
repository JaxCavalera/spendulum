import { createContext } from 'react';

// Reducer Helpers
import combineReducers, { ReducerCollection } from './utils/combineReducers';

// Reducers
import { productListReducer, productListInitialState } from './components/ProductList/ProductList-reducer';

// Models
export interface RootReducerAction {
  [type: string]: any;
}

export const rootReducerInitialState = {
  productListReducer: productListInitialState,
};

export interface IStoreContext {
  state: typeof rootReducerInitialState;
  dispatch: React.Dispatch<RootReducerAction>;
}

export const StoreContext = createContext<IStoreContext>({
  state: rootReducerInitialState,
  dispatch: () => undefined,
});

export const rootReducer = combineReducers({
  productListReducer,
});
