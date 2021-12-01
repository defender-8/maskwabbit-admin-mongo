import Module, { actionTypes } from '../Module';

const category = new Module('category', '/dashboard/categories/', actionTypes, true);

export const {
  get,
  getById,
  post,
  put,
  remove,
} = category;

export default category.reducer;
