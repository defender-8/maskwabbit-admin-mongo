import { createSelector } from 'reselect';

const selectCategoryData = state => state.category;

export const selectLoading = createSelector(
  [selectCategoryData],
  category => category.isLoading,
);

export const selectCategories = createSelector(
  [selectCategoryData],
  category => category.categories,
);

export const selectTotal = createSelector(
  [selectCategoryData],
  category => category.total,
);

export const selectCategory = createSelector(
  [selectCategoryData],
  category => category.category,
);

export const selectSuccessMessage = createSelector(
  [selectCategoryData],
  category => category.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectCategoryData],
  category => category.errorMessage,
);
