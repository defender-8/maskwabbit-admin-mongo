import axios from 'axios';
import qs from 'qs';

import actionTypes from './action-types';

export const get = (token, queryParams) => {
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
      const res = await axios.get(`/dashboard/clients/?${qs.stringify(queryParams)}`, config);
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

export const remove = (token, id, queryParams) => {
  const endpoint = `/dashboard/clients/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: actionTypes.RESET_MESSAGE_ONLY,
    });

    dispatch({
      type: actionTypes.REMOVING,
    });

    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;

      dispatch({
        type: actionTypes.DELETE,
        payload: data.message,
      });

      if (queryParams) {
        dispatch(get(token, queryParams));
      }
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

      dispatch({
        type: actionTypes.CUD_ERROR,
      });
    }
  };
};
