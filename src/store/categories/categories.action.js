import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// needed for thunk
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// redux thunk fnc
// export const fetchCategoriesAsync = () => {
//   return async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//       const categoriesArray = await getCategoriesAndDocuments();
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailed(error));
//     }
//   };
// };
