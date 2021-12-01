import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { postResetPassword } from "../../redux/auth/auth-actions";
import {
  selectUserToResetPassId,
  selectSuccessMessage,
  selectErrorMessage,
} from "../../redux/auth/auth-selectors";

import { Button, Form, FormItem, Input, message } from "../../base/components";
import Layout from "./Layout";

class PassResetEmailForm extends Component {
  state = {
    loading: false,
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  onFinish = async (values) => {
    this.toggleLoading();

    const { postResetPassword } = this.props;

    await postResetPassword(values);
    this.toggleLoading();

    const { errorMessage, successMessage } = this.props;
    if (!errorMessage) {
      message.success(successMessage);
    } else {
      message.error(errorMessage);
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Layout>
        <div className="mb-2 text-center">Please, enter your account email</div>
        <Form layout="vertical" onFinish={this.onFinish}>
          <FormItem name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              block
              htmlType="submit"
              className="mt-2"
              loading={loading}
            >
              Send an Instruction
            </Button>
          </FormItem>
        </Form>
        <div className="mt-2 text-center">
          Remembered the password? Please,{" "}
          <Link to="/auth/sign-in">Go back</Link>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  postResetPassword: (data) => dispatch(postResetPassword(data)),
});

const mapStateToProps = createStructuredSelector({
  userToResetPassId: selectUserToResetPassId,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(PassResetEmailForm);
