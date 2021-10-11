import actionTypes from './action-types';

const initialState = {
  loading: true,
  saving: false,
  removing: false,
  dataArray: [],
  total: null,
  dataSingle: null,
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
        cudError: false,
        dataSingle: payload,
      };
    case actionTypes.SAVING :
      return {
        ...state,
        loading: false,
        saving: true,
      };
    case actionTypes.POST :
      return {
        ...state,
        saving: false,
        successMessage: payload,
      };
    case actionTypes.PUT :
      return {
        ...state,
        saving: false,
        dataSingle: payload.dataSingle,
        successMessage: payload.message,
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
        saving: false,
        removing: false,
        cudError: true,
      };
    default :
      return state;
  }
}

export default reducer;
