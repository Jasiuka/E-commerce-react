import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED:
      return {
        ...state,
        erorr: payload,
      };
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  categories: [],
  erorr: null,
  isLoading: false,
};
