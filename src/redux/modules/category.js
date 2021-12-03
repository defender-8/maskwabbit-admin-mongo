import Module, { initialState, actionTypes } from "../Module";

const category = new Module({
  moduleName: "category",
  commonRoute: "/dashboard/categories/",
  initialState,
  actionTypes,
  isMultipart: true,
});

export const { get, getById, post, put, remove } = category;

export default category.reducer;
