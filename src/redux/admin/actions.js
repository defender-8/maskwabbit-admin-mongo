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
      const res = await axios.get(`/dashboard/admins/?${qs.stringify(queryParams)}`, config);
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

export const getById = (token, id) => {
  const endpoint = `/dashboard/admins/${id}`;

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

export const post = (token, formData) => {
  const endpoint = '/dashboard/admins/new';

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
      type: actionTypes.SAVING,
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

      dispatch({
        type: actionTypes.CUD_ERROR,
      });
    }
  };
};

export const put = (token, id, formData) => {
  const endpoint = `/dashboard/admins/${id}`;

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
      type: actionTypes.SAVING,
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

      dispatch({
        type: actionTypes.CUD_ERROR,
      });
    }
  };
};

export const changePassword = (token, formData) => {
  const endpoint = '/admins/change-password';

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
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: actionTypes.CHANGE_PASSWORD,
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

export const remove = (token, id, queryParams) => {
  const endpoint = `/dashboard/admins/${id}`;

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
