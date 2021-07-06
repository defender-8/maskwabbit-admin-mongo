import axios from 'axios';

import authActionTypes from './auth-action-types';

export const signIn = formData => {
  return async dispatch => {
    dispatch({
      type: authActionTypes.RESET_AUTH_MESSAGE,
    });
    try {
      const res = await axios.post('/admin/sign-in', formData);
      const data = res.data;

      dispatch({
        type: authActionTypes.SIGN_IN,
        payload: data,
      });
    } catch (err) {
      let payload;

      if (err.response) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }

      dispatch({
        type: authActionTypes.GET_AUTH_ERROR,
        payload,
      });
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    dispatch({
      type: authActionTypes.LOG_OUT,
      payload: null,
    });
  };
};

export const postResetPassword = formData => {
  return async dispatch => {
    dispatch({
      type: authActionTypes.RESET_AUTH_MESSAGE,
    });
    try {
      const res = await axios.post('/admin/password-reset', formData);
      const data = res.data;
      dispatch({
        type: authActionTypes.POST_RESET_PASSWORD,
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
        type: authActionTypes.GET_AUTH_ERROR,
        payload,
      });
    }
  };
};

export const postNewPassword = (endpoint, formData) => {
  return async dispatch => {
    dispatch({
      type: authActionTypes.RESET_AUTH_MESSAGE,
    });
    try {
      const res = await axios.post(endpoint, formData);
      const data = res.data;
      dispatch({
        type: authActionTypes.POST_NEW_PASSWORD,
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
        type: authActionTypes.GET_AUTH_ERROR,
        payload,
      });
    }
  };
};

