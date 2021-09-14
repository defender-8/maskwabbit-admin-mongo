import actionTypes from './action-types';

const initialState = {
  loading: true,
  dataArray: [],
  total: null,
  dataSingle: null,
  successMessage: null,
  errorMessage: null,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RESET_MESSAGE :
      return {
        ...state,
        loading: true,
        successMessage: null,
        errorMessage: null,
      };
    case actionTypes.RESET_MESSAGE_ONLY :
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case actionTypes.RESET_ARRAY :
      return {
        ...state,
        loading: true,
        dataArray: [],
      };
    case actionTypes.RESET_SINGLE :
      return {
        ...state,
        loading: true,
        dataSingle: null,
      };
    case actionTypes.GET :
      return {
        ...state,
        loading: false,
        dataArray: payload.dataArray,
        total: payload.total,
      };
    case actionTypes.GET_BY_ID :
      return {
        ...state,
        loading: false,
        dataSingle: payload,
      };
    case actionTypes.POST :
      return {
        ...state,
        loading: false,
        successMessage: payload,
      };
    case actionTypes.PUT :
      return {
        ...state,
        loading: false,
        dataSingle: payload.dataSingle,
        successMessage: payload.message,
      };
    case actionTypes.DELETE :
      return {
        ...state,
        successMessage: payload,
      };
    case actionTypes.GET_ERROR :
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    default :
      return state;
  }
}

export default reducer;
