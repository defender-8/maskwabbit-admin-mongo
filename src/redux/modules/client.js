import Module from "../Module";

const actionTypes = {
  RESET: "RESET",
  GET: "GET",
  GET_BY_ID: "GET_BY_ID",
  GET_ERROR: "GET_ERROR",
};

const initialState = {
  dataArr: null,
  total: null,
  loading: true,
  dataSingle: null,
  getError: false,
  errorMessage: null,
  successMessage: null,
}

const client = new Module({
  moduleName: "client",
  commonRoute: "/dashboard/clients/",
  initialState,
  actionTypes,
});

export const { get, getById } = client;

export default client.reducer;
