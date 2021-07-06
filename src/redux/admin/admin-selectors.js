import { createSelector } from 'reselect';

const selectUserData = state => state.admin;

export const selectLoading = createSelector(
  [selectUserData],
  admin => admin.isLoading,
);

export const selectUsers = createSelector(
  [selectUserData],
  admin => admin.users,
);

export const selectTotal = createSelector(
  [selectUserData],
  admin => admin.total,
);

export const selectUser = createSelector(
  [selectUserData],
  admin => admin.user,
);

export const selectSuccessMessage = createSelector(
  [selectUserData],
  admin => admin.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectUserData],
  admin => admin.errorMessage,
);
