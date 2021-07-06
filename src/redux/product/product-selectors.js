import { createSelector } from 'reselect';

const selectProductData = state => state.product;

export const selectLoading = createSelector(
  [selectProductData],
  product => product.isLoading,
);

export const selectProducts = createSelector(
  [selectProductData],
  product => product.products,
);

export const selectTotal = createSelector(
  [selectProductData],
  product => product.total,
);

export const selectProduct = createSelector(
  [selectProductData],
  product => product.product,
);

export const selectSuccessMessage = createSelector(
  [selectProductData],
  product => product.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectProductData],
  product => product.errorMessage,
);
