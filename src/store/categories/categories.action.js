import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategoriesMap = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories);

export const setCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED, error);
export const setCategoriesIsLoading = (bool) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_IS_LOADING, bool);
