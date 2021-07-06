import adminActionTypes from './admin-action-types';

const initialState = {
  isLoading: true,
  users: [],
  total: null,
  user: null,
  successMessage: null,
  errorMessage: null,
};

function adminReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case adminActionTypes.RESET_ADMIN_MESSAGE :
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorMessage: null,
      };
    case adminActionTypes.RESET_ADMIN_MESSAGE_ONLY :
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case adminActionTypes.RESET_ADMINS :
      return {
        ...state,
        isLoading: true,
        users: [],
      };
    case adminActionTypes.RESET_ADMIN :
      return {
        ...state,
        isLoading: true,
        user: null,
      };
    case adminActionTypes.GET_ADMINS :
      return {
        ...state,
        isLoading: false,
        users: payload.users,
        total: payload.total,
      };
    case adminActionTypes.GET_ADMIN :
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case adminActionTypes.POST_ADMIN :
      return {
        ...state,
        isLoading: false,
        successMessage: payload,
      };
    case adminActionTypes.POST_CHANGE_PASSWORD :
      return {
        ...state,
        isLoading: false,
        successMessage: payload,
      };
    case adminActionTypes.PUT_ADMIN :
      return {
        ...state,
        isLoading: false,
        user: payload.user,
        successMessage: payload.message,
      };
    case adminActionTypes.DELETE_ADMIN :
      return {
        ...state,
        successMessage: payload,
      };
    case adminActionTypes.GET_ADMIN_ERROR :
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default :
      return state;
  }
}

export default adminReducer;
