import axios from "axios";
import qs from "qs";

export const initialState = {
  dataArr: null,
  total: null,
  loading: true,
  dataSingle: null,
  saving: false,
  removing: false,
  getError: false,
  errorMessage: null,
  successMessage: null,
};

export const actionTypes = {
  RESET: "RESET",
  GET: "GET",
  GET_BY_ID: "GET_BY_ID",
  POST: "POST",
  PUT: "PUT",
  SAVING: "SAVING",
  DELETE: "DELETE",
  REMOVING: "REMOVING",
  GET_ERROR: "GET_ERROR",
};

export default class Module {
  constructor({
    moduleName,
    commonRoute,
    initialState,
    actionTypes,
    isMultipart = false,
  }) {
    this.commonRoute = commonRoute;
    this.moduleName = moduleName;
    this.initialState = initialState;
    this.actionTypes = this.getModuleActionTypes(actionTypes);
    this.isMultipart = isMultipart;

    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.remove = this.remove.bind(this);
    this.reducer = this.reducer.bind(this);
  }

  getModuleActionTypes(actionTypes) {
    const moduleActionTypes = {};

    for (let key in actionTypes) {
      moduleActionTypes[key] = `${this.moduleName}/${actionTypes[key]}`;
    }

    return moduleActionTypes;
  }

  get(token, queryParams) {
    const endpoint = this.commonRoute + "?" + qs.stringify(queryParams);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return async (dispatch) => {
      dispatch({
        type: this.actionTypes.RESET,
      });

      try {
        const res = await axios.get(endpoint, config);
        const data = res.data;

        dispatch({
          type: this.actionTypes.GET,
          payload: data,
        });
      } catch (err) {
        let payload;

        if (err.response.data.message) {
          payload = {
            message: err.response.data.message,
            isGetError: true,
          };
        } else {
          payload = {
            message: err.message,
            isGetError: true,
          };
        }

        dispatch({
          type: this.actionTypes.GET_ERROR,
          payload,
        });
      }
    };
  }

  getById(token, id) {
    const endpoint = this.commonRoute + id;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return async (dispatch) => {
      dispatch({
        type: this.actionTypes.RESET,
      });

      try {
        const res = await axios.get(endpoint, config);
        const data = res.data;

        dispatch({
          type: this.actionTypes.GET_BY_ID,
          payload: data.dataSingle,
        });
      } catch (err) {
        let payload;

        if (err.response.data.message) {
          payload = {
            message: err.response.data.message,
            isGetError: true,
          };
        } else {
          payload = {
            message: err.message,
            isGetError: true,
          };
        }

        dispatch({
          type: this.actionTypes.GET_ERROR,
          payload,
        });
      }
    };
  }

  post(token, formData) {
    const endpoint = this.commonRoute + "new";

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (this.isMultipart) {
      config["Content-Type"] = "multipart/form-data";
    }

    return async (dispatch) => {
      dispatch({
        type: this.actionTypes.SAVING,
      });

      try {
        const res = await axios.post(endpoint, formData, config);
        const data = res.data;

        dispatch({
          type: this.actionTypes.POST,
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
          type: this.actionTypes.GET_ERROR,
          payload,
        });
      }
    };
  }

  put(token, id, formData) {
    const endpoint = this.commonRoute + id;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (this.isMultipart) {
      config["Content-Type"] = "multipart/form-data";
    }

    return async (dispatch) => {
      dispatch({
        type: this.actionTypes.SAVING,
      });

      try {
        const res = await axios.put(endpoint, formData, config);
        const data = res.data;

        dispatch({
          type: this.actionTypes.PUT,
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
          type: this.actionTypes.GET_ERROR,
          payload,
        });
      }
    };
  }

  remove(token, id, queryParams) {
    const endpoint = this.commonRoute + id;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return async (dispatch) => {
      dispatch({
        type: this.actionTypes.REMOVING,
      });

      try {
        const res = await axios.delete(endpoint, config);
        const data = res.data;

        dispatch({
          type: this.actionTypes.DELETE,
          payload: data.message,
        });

        if (queryParams) {
          dispatch(this.get(token, queryParams));
        }
      } catch (err) {
        let payload;

        if (err.response.data.message) {
          payload = err.response.data.message;
        } else {
          payload = err.message;
        }

        dispatch({
          type: this.actionTypes.GET_ERROR,
          payload,
        });
      }
    };
  }

  reducer(state = this.initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case this.actionTypes.RESET:
        return {
          ...state,
          loading: true,
          getError: false,
          successMessage: null,
          errorMessage: null,
        };
      case this.actionTypes.GET:
        return {
          ...state,
          loading: false,
          dataArr: payload.dataArr,
          total: payload.total,
        };
      case this.actionTypes.GET_BY_ID:
        return {
          ...state,
          loading: false,
          dataSingle: payload,
        };
      case this.actionTypes.SAVING:
        return {
          ...state,
          saving: true,
          successMessage: null,
          errorMessage: null,
        };
      case this.actionTypes.POST:
        return {
          ...state,
          saving: false,
          successMessage: payload,
        };
      case this.actionTypes.PUT:
        return {
          ...state,
          saving: false,
          dataSingle: payload.dataSingle,
          successMessage: payload.message,
        };
      case this.actionTypes.REMOVING:
        return {
          ...state,
          removing: true,
          successMessage: null,
          errorMessage: null,
        };
      case this.actionTypes.DELETE:
        return {
          ...state,
          removing: false,
          successMessage: payload,
        };
      case this.actionTypes.GET_ERROR:
        return {
          ...state,
          loading: false,
          saving: false,
          removing: false,
          getError: payload.isGetError,
          errorMessage: payload.message || payload,
        };
      default:
        return state;
    }
  }
}
