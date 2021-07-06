import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { signIn } from '../../redux/auth/auth-actions';
import {
  selectErrorMessage,
} from '../../redux/auth/auth-selectors';

import Auth from './Auth';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormItem from '../../components/Form/FormItem';
import Input from '../../components/Form/Input/Input';
import InputPassword from '../../components/Form/Input/InputPassword';

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
      <Auth>
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
      </Auth>
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
