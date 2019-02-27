interface ReducerState {
  isValid: boolean;
}

interface ReducerAction {
  type: string;
  isValid?: boolean;
}

export enum ReducerOneActionTypes {
  UPDATE_IS_VALID = 'reducerOne/UPDATE_IS_VALID',
}

export enum ReducerTwoActionTypes {
  UPDATE_IS_VALID = 'reducerTwo/UPDATE_IS_VALID',
}

export const initialAppState = {
  reducerOne: {
    isValid: false,
  },
  reducerTwo: {
    isValid: false,
  },
};

export const reducerOne = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerOneActionTypes.UPDATE_IS_VALID:
      return {
        ...state,
        isValid: action.isValid,
      };

    default:
      return state;
  }
};

export const reducerTwo = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerTwoActionTypes.UPDATE_IS_VALID:
      return {
        ...state,
        isValid: action.isValid,
      };

    default:
      return state;
  }
};

export const validReducerCollection = {
  reducerOne,
  reducerTwo,
};
