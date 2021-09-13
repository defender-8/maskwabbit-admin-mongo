import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signIn } from '../../redux/auth/auth-actions';
import {
  selectErrorMessage,
} from '../../redux/auth/auth-selectors';

import { Button, Form, FormItem, Input, InputPassword, message } from '../../base/components';
import Layout from './Layout';

class SignIn extends Component {
  state = {
    loading: false,
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  onFinish = async values => {
    this.toggleLoading();

    const { signIn, history } = this.props;

    await signIn(values);
    this.toggleLoading();

    const { errorMessage } = this.props;
    if (!errorMessage) {
      history.replace('/');
    } else {
      message.error(errorMessage);
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Layout>
        <Form
          layout="vertical"
          onFinish={this.onFinish}
        >
          <FormItem
            name="email"
            label="Email"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
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
              Sign In
            </Button>
          </FormItem>
        </Form>
        <div className="mt-2 text-center">
          <Link to="/auth/password-reset">Forgot your password?</Link>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: (data) => dispatch(signIn(data)),
});

const mapStateToProps = createStructuredSelector({
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
