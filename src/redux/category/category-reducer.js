import categoryActionTypes from './category-action-types';

const initialState = {
  isLoading: true,
  categories: [],
  total: null,
  category: null,
  successMessage: null,
  errorMessage: null,
};

function categoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case categoryActionTypes.RESET_CATEGORY_MESSAGE :
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorMessage: null,
      };
    case categoryActionTypes.RESET_CATEGORY_MESSAGE_ONLY :
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case categoryActionTypes.RESET_CATEGORIES :
      return {
        ...state,
        isLoading: true,
        categories: [],
      };
    case categoryActionTypes.RESET_CATEGORY :
      return {
        ...state,
        isLoading: true,
        category: null,
      };
    case categoryActionTypes.GET_CATEGORIES :
      return {
        ...state,
        isLoading: false,
        categories: payload.categories,
        total: payload.total,
      };
    case categoryActionTypes.GET_CATEGORY :
      return {
        ...state,
        isLoading: false,
        category: payload,
      };
    case categoryActionTypes.POST_CATEGORY :
      return {
        ...state,
        isLoading: false,
        successMessage: payload,
      };
    case categoryActionTypes.PUT_CATEGORY :
      return {
        ...state,
        isLoading: false,
        category: { ...state.category, ...payload.category },
        successMessage: payload.message,
      };
    case categoryActionTypes.DELETE_CATEGORY :
      return {
        ...state,
        successMessage: payload,
      };
    case categoryActionTypes.GET_CATEGORY_ERROR :
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default :
      return state;
  }
}

export default categoryReducer;
