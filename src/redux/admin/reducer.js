import actionTypes from "./action-types";

const initialState = {
  dataArr: null,
  total: null,
  loading: true,
  dataSingle: null,
  saving: false,
  removing: false,
  getError: false,
  errorMessage: null,
  successMessage: null,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RESET:
      return {
        ...state,
        loading: true,
        getError: false,
        successMessage: null,
        errorMessage: null,
      };
    case actionTypes.GET:
      return {
        ...state,
        loading: false,
        dataArr: payload.dataArr,
        total: payload.total,
      };
    case actionTypes.GET_BY_ID:
      return {
        ...state,
        loading: false,
        dataSingle: payload,
      };
    case actionTypes.SAVING:
      return {
        ...state,
        saving: true,
        successMessage: null,
        errorMessage: null,
      };
    case actionTypes.POST:
      return {
        ...state,
        saving: false,
        successMessage: payload,
      };
    case actionTypes.PUT:
      return {
        ...state,
        saving: false,
        dataSingle: payload.dataSingle,
        successMessage: payload.message,
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        saving: false,
        successMessage: payload,
      };
    case actionTypes.REMOVING:
      return {
        ...state,
        removing: true,
        successMessage: null,
        errorMessage: null,
      };
    case actionTypes.DELETE:
      return {
        ...state,
        removing: false,
        successMessage: payload,
      };
    case actionTypes.GET_ERROR:
      return {
        ...state,
        loading: false,
        saving: false,
        removing: false,
        getError: payload.isGetError,
        errorMessage: payload.message || payload,
      };
    default:
      return state;
  }
}

export default reducer;
