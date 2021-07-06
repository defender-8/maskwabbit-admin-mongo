import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  auth => auth.currentUser,
);

export const selectUserToResetPassId = createSelector(
  [selectAuth],
  auth => auth.userToResetPassId,
);

export const selectSuccessMessage = createSelector(
  [selectAuth],
  auth => auth.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectAuth],
  auth => auth.errorMessage,
);
