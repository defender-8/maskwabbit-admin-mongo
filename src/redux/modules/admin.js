import Module, { initialState, actionTypes } from "../Module";
import axios from "axios";

class Admin extends Module {
  constructor({
    moduleName,
    commonRoute,
    initialState,
    actionTypes,
    isMultipart,
  }) {
    super({ moduleName, commonRoute, initialState, actionTypes, isMultipart });

    this.changePassword = this.changePassword.bind(this);
  }

  changePassword(token, formData) {
    const endpoint = this.commonRoute + "change-password";

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    return async (dispatch) => {
      dispatch({
        type: this.actionTypes.SAVING,
      });

      try {
        const res = await axios.post(endpoint, formData, config);
        const data = res.data;

        dispatch({
          type: this.actionTypes.CHANGE_PASSWORD,
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

  reducer(state = this.initialState, action) {
    const { type, payload } = action;

    if (type === this.actionTypes.CHANGE_PASSWORD) {
      return {
        ...state,
        saving: false,
        successMessage: payload,
      };
    }

    return super.reducer(state, action);
  }
}

const admin = new Admin({
  moduleName: "admin",
  commonRoute: "/dashboard/admins/",
  initialState,
  actionTypes: {
    ...actionTypes,
    CHANGE_PASSWORD: "ADMIN_CHANGE_PASSWORD",
  },
});

export const { get, getById, post, put, changePassword, remove } = admin;

export default admin.reducer;
