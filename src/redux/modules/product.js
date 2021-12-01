import Module, { actionTypes } from "../Module";

const product = new Module(
  "product",
  "/dashboard/products/",
  actionTypes,
  true
);

export const { get, getById, post, put, remove } = product;

export default product.reducer;
