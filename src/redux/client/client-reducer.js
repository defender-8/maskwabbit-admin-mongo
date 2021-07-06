import clientActionTypes from './client-action-types';

const initialState = {
  isLoading: true,
  users: [],
  total: null,
  successMessage: null,
  errorMessage: null,
};

function clientReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case clientActionTypes.RESET_CLIENT_MESSAGE :
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorMessage: null,
      };
    case clientActionTypes.RESET_CLIENT_MESSAGE_ONLY :
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case clientActionTypes.RESET_CLIENTS :
      return {
        ...state,
        isLoading: true,
        users: [],
      };
    case clientActionTypes.GET_CLIENTS :
      return {
        ...state,
        isLoading: false,
        users: payload.users,
        total: payload.total,
      };
    case clientActionTypes.DELETE_CLIENT :
      return {
        ...state,
        successMessage: payload,
      };
    case clientActionTypes.GET_CLIENT_ERROR :
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default :
      return state;
  }
}

export default clientReducer;
