import axios from 'axios';

import categoryActionTypes from './category-action-types';

// GET

export const getArr = (endpoint, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: categoryActionTypes.RESET_CATEGORY_MESSAGE,
    });
    dispatch({
      type: categoryActionTypes.RESET_CATEGORIES,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: categoryActionTypes.GET_CATEGORIES,
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
        type: categoryActionTypes.GET_CATEGORY_ERROR,
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
      type: categoryActionTypes.RESET_CATEGORY_MESSAGE,
    });
    dispatch({
      type: categoryActionTypes.RESET_CATEGORY,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: categoryActionTypes.GET_CATEGORY,
        payload: data.category,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: categoryActionTypes.GET_CATEGORY_ERROR,
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
      type: categoryActionTypes.RESET_CATEGORY_MESSAGE,
    });
    try {
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: categoryActionTypes.POST_CATEGORY,
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
        type: categoryActionTypes.GET_CATEGORY_ERROR,
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
      type: categoryActionTypes.RESET_CATEGORY_MESSAGE,
    });

    try {
      const res = await axios.put(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: categoryActionTypes.PUT_CATEGORY,
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
        type: categoryActionTypes.GET_CATEGORY_ERROR,
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
      type: categoryActionTypes.RESET_CATEGORY_MESSAGE_ONLY,
    });

    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: categoryActionTypes.DELETE_CATEGORY,
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
        type: categoryActionTypes.GET_CATEGORY_ERROR,
        payload,
      });
    }
  };
};
