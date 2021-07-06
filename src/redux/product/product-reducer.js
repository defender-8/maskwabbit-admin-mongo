import productActionTypes from './product-action-types';

const initialState = {
  isLoading: true,
  products: [],
  total: null,
  product: null,
  successMessage: null,
  errorMessage: null,
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case productActionTypes.RESET_PRODUCT_MESSAGE :
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorMessage: null,
      };
    case productActionTypes.RESET_PRODUCT_MESSAGE_ONLY :
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case productActionTypes.RESET_PRODUCTS :
      return {
        ...state,
        isLoading: true,
        products: [],
      };
    case productActionTypes.RESET_PRODUCT :
      return {
        ...state,
        isLoading: true,
        product: null,
      };
    case productActionTypes.GET_PRODUCTS :
      return {
        ...state,
        isLoading: false,
        products: payload.products,
        total: payload.total,
      };
    case productActionTypes.GET_PRODUCT :
      return {
        ...state,
        isLoading: false,
        product: payload,
      };
    case productActionTypes.POST_PRODUCT :
      return {
        ...state,
        isLoading: false,
        successMessage: payload,
      };
    case productActionTypes.PUT_PRODUCT :
      return {
        ...state,
        isLoading: false,
        product: payload.product,
        successMessage: payload.message,
      };
    case productActionTypes.DELETE_PRODUCT :
      return {
        ...state,
        successMessage: payload,
      };
    case productActionTypes.GET_PRODUCT_ERROR :
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default :
      return state;
  }
}

export default productReducer;
