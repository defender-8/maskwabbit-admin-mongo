import { createSelector } from 'reselect';

const selectUserData = state => state.client;

export const selectLoading = createSelector(
  [selectUserData],
  client => client.isLoading,
);

export const selectUsers = createSelector(
  [selectUserData],
  client => client.users,
);

export const selectTotal = createSelector(
  [selectUserData],
  client => client.total,
);

export const selectSuccessMessage = createSelector(
  [selectUserData],
  client => client.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectUserData],
  client => client.errorMessage,
);
