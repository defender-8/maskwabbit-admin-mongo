import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { postNewPassword } from '../../redux/auth/auth-actions';
import {
  selectUserToResetPassId,
  selectSuccessMessage,
  selectErrorMessage,
} from '../../redux/auth/auth-selectors';

import { Button, Form, FormItem, InputPassword, message } from '../../base/components';
import Layout from './Layout';

class PassResetPassForm extends Component {
  state = {
    loading: false,
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  onFinish = async values => {
    this.toggleLoading();

    const { postNewPassword, history, match, userToResetPassId } = this.props;
    values.userId = userToResetPassId;

    await postNewPassword(`/admin/password-reset/${match.params.token}`, values);
    this.toggleLoading();

    const { errorMessage, successMessage } = this.props;
    if (!errorMessage) {
      message.success(successMessage);
      history.replace('/auth/sign-in');
    } else {
      message.error(errorMessage);
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Layout>
        <div className="mt-2 text-center">
          Please, enter new password
        </div>
        <Form
          layout="vertical"
          onFinish={this.onFinish}
        >
          <FormItem
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <InputPassword />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              block
              htmlType="submit"
              className="mt-2"
              loading={loading}
            >
              Save
            </Button>
          </FormItem>
        </Form>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postNewPassword: (endpoint, data) => dispatch(postNewPassword(endpoint, data)),
});

const mapStateToProps = createStructuredSelector({
  userToResetPassId: selectUserToResetPassId,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(PassResetPassForm);
