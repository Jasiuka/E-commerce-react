import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoriesReducer],
  (categoriesReducer) => categoriesReducer.categories
);

export const selectCategories = createSelector(
  [selectCategoriesMap],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesReducer) => categoriesReducer.isLoading
);
