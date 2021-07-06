import { createSelector } from 'reselect';

const selectPodCatData = state => state.prodCat;

export const selectLoading = createSelector(
  [selectPodCatData],
  prodCat => prodCat.isLoading,
);

export const selectProdCats = createSelector(
  [selectPodCatData],
  prodCat => prodCat.prodCats,
);

export const selectTotal = createSelector(
  [selectPodCatData],
  prodCat => prodCat.total,
);

export const selectProdCat = createSelector(
  [selectPodCatData],
  prodCat => prodCat.prodCat,
);

export const selectSuccessMessage = createSelector(
  [selectPodCatData],
  prodCat => prodCat.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectPodCatData],
  prodCat => prodCat.errorMessage,
);
