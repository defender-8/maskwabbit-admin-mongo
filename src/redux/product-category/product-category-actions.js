import axios from 'axios';

import prodCatActionTypes from './product-category-action-types';

// GET

export const getArr = (endpoint, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CAT_MESSAGE,
    });
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CATS,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: prodCatActionTypes.GET_PROD_CATS,
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
        type: prodCatActionTypes.GET_PROD_CAT_ERROR,
        payload,
      });
    }
  };
};

export const getOne = (id, token) => {
  const endpoint = `/admin/product-categories/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CAT_MESSAGE,
    });
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CAT,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: prodCatActionTypes.GET_PROD_CAT,
        payload: data.prodCat,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: prodCatActionTypes.GET_PROD_CAT_ERROR,
        payload,
      });
    }
  };
};

// POST

export const post = (formData, token) => {
  const endpoint = '/admin/product-categories/new';

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return async dispatch => {
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CAT_MESSAGE,
    });
    try {
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: prodCatActionTypes.POST_PROD_CAT,
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
        type: prodCatActionTypes.GET_PROD_CAT_ERROR,
        payload,
      });
    }
  };
};

// PUT

export const put = (id, formData, token) => {
  const endpoint = `/admin/product-categories/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return async dispatch => {
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CAT_MESSAGE,
    });

    try {
      const res = await axios.put(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: prodCatActionTypes.PUT_PROD_CAT,
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
        type: prodCatActionTypes.GET_PROD_CAT_ERROR,
        payload,
      });
    }
  };
};

// DELETE

export const delOne = (id, token) => {
  const endpoint = `/admin/product-categories/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: prodCatActionTypes.RESET_PROD_CAT_MESSAGE_ONLY,
    });

    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: prodCatActionTypes.DELETE_PROD_CAT,
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
        type: prodCatActionTypes.GET_PROD_CAT_ERROR,
        payload,
      });
    }
  };
};
