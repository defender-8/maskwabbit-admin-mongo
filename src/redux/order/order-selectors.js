import { createSelector } from 'reselect';

const selectOrderData = state => state.order;

export const selectLoading = createSelector(
  [selectOrderData],
  order => order.isLoading,
);

export const selectOrders = createSelector(
  [selectOrderData],
  order => order.orders,
);

export const selectTotal = createSelector(
  [selectOrderData],
  order => order.total,
);

export const selectOrder = createSelector(
  [selectOrderData],
  order => order.order,
);

export const selectSuccessMessage = createSelector(
  [selectOrderData],
  order => order.successMessage,
);

export const selectErrorMessage = createSelector(
  [selectOrderData],
  order => order.errorMessage,
);
