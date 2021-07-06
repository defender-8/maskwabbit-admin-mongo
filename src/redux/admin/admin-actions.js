import axios from 'axios';

import adminActionTypes from './admin-action-types';

// GET
export const getArr = (endpoint, token) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: adminActionTypes.RESET_ADMIN_MESSAGE,
    });
    dispatch({
      type: adminActionTypes.RESET_ADMINS,
    });

    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;

      dispatch({
        type: adminActionTypes.GET_ADMINS,
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
        type: adminActionTypes.GET_ADMIN_ERROR,
        payload,
      });
    }
  };
};

export const getOne = (id, token) => {
  const endpoint = `/admin/admins/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: adminActionTypes.RESET_ADMIN_MESSAGE,
    });
    dispatch({
      type: adminActionTypes.RESET_ADMIN,
    });

    try {
      const res = await axios.get(endpoint, config);
      const data = res.data;
      dispatch({
        type: adminActionTypes.GET_ADMIN,
        payload: data.user,
      });
    } catch (err) {
      let payload;

      if (err.response.data.message) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: adminActionTypes.GET_ADMIN_ERROR,
        payload,
      });
    }
  };
};

// POST

export const post = (formData, token) => {
  const endpoint = '/admin/admins/new';

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: adminActionTypes.RESET_ADMIN_MESSAGE,
    });
    try {
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: adminActionTypes.POST_ADMIN,
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
        type: adminActionTypes.GET_ADMIN_ERROR,
        payload,
      });
    }
  };
};

export const postChangePassword = (formData, token) => {
  const endpoint = '/admin/change-password';

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: adminActionTypes.RESET_ADMIN_MESSAGE_ONLY,
    });
    try {
      const res = await axios.post(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: adminActionTypes.POST_CHANGE_PASSWORD,
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
        type: adminActionTypes.GET_ADMIN_ERROR,
        payload,
      });
    }
  };
};

// PUT

export const put = (id, formData, token) => {
  const endpoint = `/admin/admins/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: adminActionTypes.RESET_ADMIN_MESSAGE,
    });
    try {
      const res = await axios.put(endpoint, formData, config);
      const data = res.data;
      dispatch({
        type: adminActionTypes.PUT_ADMIN,
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
        type: adminActionTypes.GET_ADMIN_ERROR,
        payload,
      });
    }
  };
};

// DELETE

export const delOne = (id, token) => {
  const endpoint = `/admin/admins/${id}`;

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  return async dispatch => {
    dispatch({
      type: adminActionTypes.RESET_ADMIN_MESSAGE_ONLY,
    });
    try {
      const res = await axios.delete(endpoint, config);
      const data = res.data;
      dispatch({
        type: adminActionTypes.DELETE_ADMIN,
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
        type: adminActionTypes.GET_ADMIN_ERROR,
        payload,
      });
    }
  };
};
