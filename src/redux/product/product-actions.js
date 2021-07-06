import axios from 'axios';

import productActionTypes from './product-action-types';

// GET
export const getArr = (endpoint, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: productActionTypes.RESET_PRODUCT_MESSAGE,
    });
    dispatch({
      type: productActionTypes.RESET_PRODUCTS,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: productActionTypes.GET_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: productActionTypes.GET_PRODUCT_ERROR,
        payload,
      });
    }
  };
};

export const getOne = (id, token) => {
  const endpoint = `/admin/products/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  return async dispatch => {
    dispatch({
      type: productActionTypes.RESET_PRODUCT_MESSAGE,
    });
    dispatch({
      type: productActionTypes.RESET_PRODUCT,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: productActionTypes.GET_PRODUCT,
        payload: data.product,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: productActionTypes.GET_PRODUCT_ERROR,
        payload,
      });
    }
  };
};

// POST

export const post = (formData, token) => {
  const endpoint = '/admin/products/new';

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return async dispatch => {
    dispatch({
      type: productActionTypes.RESET_PRODUCT_MESSAGE,
    });

    try {
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: productActionTypes.POST_PRODUCT,
        payload: data.message,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: productActionTypes.GET_PRODUCT_ERROR,
        payload,
      });
    }
  };
};

// PUT

export const put = (id, formData, token) => {
  const endpoint = `/admin/products/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return async dispatch => {
    dispatch({
      type: productActionTypes.RESET_PRODUCT_MESSAGE,
    });

    try {
      const res = await axios.put(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: productActionTypes.PUT_PRODUCT,
        payload: data,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: productActionTypes.GET_PRODUCT_ERROR,
        payload,
      });
    }
  };
};

// DELETE

export const delOne = (id, token) => {
  const endpoint = `/admin/products/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: productActionTypes.RESET_PRODUCT_MESSAGE_ONLY,
    });

    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: productActionTypes.DELETE_PRODUCT,
        payload: data.message,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: productActionTypes.GET_PRODUCT_ERROR,
        payload,
      });
    }
  };
};
