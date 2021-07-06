import prodCatActionTypes from './product-category-action-types';

const initialState = {
  isLoading: true,
  prodCats: [],
  total: null,
  prodCat: null,
  successMessage: null,
  errorMessage: null,
};

function prodCatReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case prodCatActionTypes.RESET_PROD_CAT_MESSAGE :
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorMessage: null,
      };
    case prodCatActionTypes.RESET_PROD_CAT_MESSAGE_ONLY :
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case prodCatActionTypes.RESET_PROD_CATS :
      return {
        ...state,
        isLoading: true,
        prodCats: [],
      };
    case prodCatActionTypes.RESET_PROD_CAT :
      return {
        ...state,
        isLoading: true,
        prodCat: null,
      };
    case prodCatActionTypes.GET_PROD_CATS :
      return {
        ...state,
        isLoading: false,
        prodCats: payload.prodCats,
        total: payload.total,
      };
    case prodCatActionTypes.GET_PROD_CAT :
      return {
        ...state,
        isLoading: false,
        prodCat: payload,
      };
    case prodCatActionTypes.POST_PROD_CAT :
      return {
        ...state,
        isLoading: false,
        successMessage: payload,
      };
    case prodCatActionTypes.PUT_PROD_CAT :
      return {
        ...state,
        isLoading: false,
        prodCat: { ...state.prodCat, ...payload.prodCat },
        successMessage: payload.message,
      };
    case prodCatActionTypes.DELETE_PROD_CAT :
      return {
        ...state,
        successMessage: payload,
      };
    case prodCatActionTypes.GET_PROD_CAT_ERROR :
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default :
      return state;
  }
}

export default prodCatReducer;
