import Module, { initialState, actionTypes } from "../Module";

const product = new Module({
  moduleName: "product",
  commonRoute: "/dashboard/products/",
  initialState,
  actionTypes,
  isMultipart: true,
});

export const { get, getById, post, put, remove } = product;

export default product.reducer;
