import authActionTypes from './auth-action-types';

const initialState = {
  currentUser: null,
  userToResetPassId: null,
  successMessage: null,
  errorMessage: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case authActionTypes.RESET_AUTH_MESSAGE :
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
      };
    case authActionTypes.SIGN_IN:
      return {
        ...state,
        currentUser: payload,
      };
    case authActionTypes.LOG_OUT:
      return {
        ...state,
        currentUser: payload,
      };
    case authActionTypes.POST_RESET_PASSWORD:
      return {
        ...state,
        userToResetPassId: payload.userId,
        successMessage: payload.message,
      };
    case authActionTypes.POST_NEW_PASSWORD:
      return {
        ...state,
        userToResetPassId: null,
        successMessage: payload,
      };
    case authActionTypes.GET_AUTH_ERROR :
      return {
        ...state,
        errorMessage: payload,
      };
    default:
      return state;
  }
}

export default authReducer;
