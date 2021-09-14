import axios from 'axios';
import qs from 'qs';

import actionTypes from './action-types';

export const get = (queryParams, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });
    dispatch({
      type: actionTypes.RESET_ARRAY,
    });
    try {
      const res = await axios.get(`/dashboard/products/?${qs.stringify(queryParams)}`, config);
      const data = res.data;
      dispatch({
        type: actionTypes.GET,
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
        type: actionTypes.GET_ERROR,
        payload,
      });
    }
  };
};

export const getById = (id, token) => {
  const endpoint = `/dashboard/products/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  return async dispatch => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });
    dispatch({
      type: actionTypes.RESET_SINGLE,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: actionTypes.GET_BY_ID,
        payload: data.dataSingle,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: actionTypes.GET_ERROR,
        payload,
      });
    }
  };
};

export const post = (formData, token) => {
  const endpoint = '/dashboard/products/new';

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return async dispatch => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });

    try {
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: actionTypes.POST,
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
        type: actionTypes.GET_ERROR,
        payload,
      });
    }
  };
};

export const put = (id, formData, token) => {
  const endpoint = `/dashboard/products/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return async dispatch => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });

    try {
      const res = await axios.put(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: actionTypes.PUT,
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
        type: actionTypes.GET_ERROR,
        payload,
      });
    }
  };
};

export const remove = (id, token) => {
  const endpoint = `/dashboard/products/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: actionTypes.RESET_MESSAGE_ONLY,
    });

    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: actionTypes.DELETE,
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
        type: actionTypes.GET_ERROR,
        payload,
      });
    }
  };
};
