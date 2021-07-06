import axios from 'axios';

import orderActionTypes from './order-action-types';

// GET
export const getArr = (endpoint, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: orderActionTypes.RESET_ORDER_MESSAGE,
    });
    dispatch({
      type: orderActionTypes.RESET_ORDERS,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: orderActionTypes.GET_ORDERS,
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
        type: orderActionTypes.GET_ORDER_ERROR,
        payload,
      });
    }
  };
};

export const getOne = (id, token) => {
  const endpoint = `/admin/orders/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  return async dispatch => {
    dispatch({
      type: orderActionTypes.RESET_ORDER_MESSAGE,
    });
    dispatch({
      type: orderActionTypes.RESET_ORDER,
    });
    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: orderActionTypes.GET_ORDER,
        payload: data.order,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: orderActionTypes.GET_ORDER_ERROR,
        payload,
      });
    }
  };
};

// PUT
export const put = (id, formData, token) => {
  const endpoint = `/admin/orders/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: orderActionTypes.RESET_ORDER_MESSAGE,
    });

    try {
      const res = await axios.put(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: orderActionTypes.PUT_ORDER,
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
        type: orderActionTypes.GET_ORDER_ERROR,
        payload,
      });
    }
  };
};

// DELETE
export const delOne = (id, token) => {
  const endpoint = `/admin/orders/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: orderActionTypes.RESET_ORDER_MESSAGE_ONLY,
    });

    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: orderActionTypes.DELETE_ORDER,
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
        type: orderActionTypes.GET_ORDER_ERROR,
        payload,
      });
    }
  };
};
