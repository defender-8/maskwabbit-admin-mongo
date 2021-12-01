import axios from "axios";

import actionTypes from "./action-types";

export const signIn = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });

    try {
      const res = await axios.post("/dashboard/auth/sign-in", formData);
      const data = res.data;

      dispatch({
        type: actionTypes.SIGN_IN,
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
        type: actionTypes.GET_ERROR,
        payload,
      });
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });

    dispatch({
      type: actionTypes.LOG_OUT,
    });
  };
};

export const resetPassword = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });

    try {
      const res = await axios.post("/dashboard/auth/password-reset", formData);
      const data = res.data;

      dispatch({
        type: actionTypes.RESET_PASSWORD,
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

export const changePassword = (endpoint, formData) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_MESSAGE,
    });

    try {
      const res = await axios.post(endpoint, formData);
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
