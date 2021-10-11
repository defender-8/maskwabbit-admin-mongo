import actionTypes from './action-types';

const initialState = {
  loading: true,
  removing: false,
  dataArray: [],
  total: null,
  successMessage: null,
  errorMessage: null,
  cudError: false,
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
    case actionTypes.GET :
      return {
        ...state,
        loading: false,
        dataArray: payload.dataArray,
        total: payload.total,
      };
    case actionTypes.REMOVING :
      return {
        ...state,
        removing: true,
      };
    case actionTypes.DELETE :
      return {
        ...state,
        removing: false,
        successMessage: payload,
      };
    case actionTypes.GET_ERROR :
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case actionTypes.CUD_ERROR :
      return {
        ...state,
        removing: false,
        cudError: true,
      };
    default :
      return state;
  }
}

export default reducer;
