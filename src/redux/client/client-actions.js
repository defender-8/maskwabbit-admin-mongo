import axios from 'axios';

import clientActionTypes from './client-action-types';

// GET
export const getArr = (endpoint, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: clientActionTypes.RESET_CLIENT_MESSAGE,
    });
    dispatch({
      type: clientActionTypes.RESET_CLIENTS,
    });

    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;

      dispatch({
        type: clientActionTypes.GET_CLIENTS,
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
        type: clientActionTypes.GET_CLIENT_ERROR,
        payload,
      });
    }
  };
};

// DELETE

export const delOne = (id, token) => {
  const endpoint = `/admin/clients/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: clientActionTypes.RESET_CLIENT_MESSAGE_ONLY,
    });
    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: clientActionTypes.DELETE_CLIENT,
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
        type: clientActionTypes.GET_CLIENT_ERROR,
        payload,
      });
    }
  };
};
