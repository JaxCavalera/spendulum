import { createContext } from 'react';

// // Page Reducers
// import { shirtsReducer } from './pages/Shirts/Shirts-reducer';
// import { pantsReducer } from './pages/Pants/Pants-reducer';
// // import { shoesReducer } from './pages/Shoes/Shoes-reducer';

// export const rootReducer = (state, action) => {
//   const combinedReducers = {
//     shirtsReducer,
//     pantsReducer,
//     // shoesReducer,
//   };

//   const [store, dispatch] = useReducer()
// };

export interface BasicItemOption {
  label: string;
  value: string;
}

export interface RootReducerState {
  cartItems: BasicItemOption[];
}

export enum RootReducerActionTypes {
  UPDATE_CART_ITEMS = 'rootReducer/UPDATE_CART_ITEMS',
  UPDATE_CART_QTY = 'rootReducer/UPDATE_CART_QTY',
};

export interface RootReducerAction {
  type: RootReducerActionTypes;
  cartItems: BasicItemOption[];
}

export const rootReducerInitialState: RootReducerState = {
  cartItems: [],
};

export interface IStoreContext {
  state: RootReducerState;
  dispatch: React.Dispatch<RootReducerAction>;
}

export const StoreContext = createContext<IStoreContext>({
  state: rootReducerInitialState,
  dispatch: () => undefined,
});

export const rootReducer = (state: RootReducerState, action: RootReducerAction) => {
  switch (action.type) {
    case RootReducerActionTypes.UPDATE_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};
