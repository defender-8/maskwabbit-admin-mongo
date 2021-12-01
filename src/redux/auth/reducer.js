import actionTypes from "./action-types";

const initialState = {
  loading: false,
  user: null,
  userToResetPassId: null,
  successMessage: null,
  errorMessage: null,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        loading: true,
        successMessage: null,
        errorMessage: null,
      };
    case actionTypes.SIGN_IN:
      return {
        ...state,
        loading: false,
        user: payload.user,
        successMessage: payload.message,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case actionTypes.RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        userToResetPassId: payload.userId,
        successMessage: payload.message,
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        loading: false,
        userToResetPassId: null,
        successMessage: payload,
      };
    case actionTypes.GET_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
}

export default reducer;
