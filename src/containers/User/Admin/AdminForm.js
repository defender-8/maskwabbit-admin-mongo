import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { Form, message } from 'antd';

import { getOne, post, put, delOne } from '../../../redux/admin/admin-actions';
import { logOut } from '../../../redux/auth/auth-actions';
import { selectCurrentUser } from '../../../redux/auth/auth-selectors';
import {
  selectLoading,
  selectUser,
  selectSuccessMessage,
  selectErrorMessage,
} from '../../../redux/admin/admin-selectors';


import Layout from '../../../components/Layout/Layout';
import Spin from '../../../components/Spin/Spin';
import Alert from '../../../components/Alert/Alert';
import FormActions from '../../../components/Form/FormActions/FormActions';
import FormItem from '../../../components/Form/FormItem';
import Input from '../../../components/Form/Input/Input';
import InputPassword from '../../../components/Form/Input/InputPassword';
import ChangePassModal from '../components/ChangePassModal';

class AdminForm extends Component {
  state = {
    errMess: false,
    isSpinHidden: false,
    saveLoading: false,
    delLoading: false,
  };

  formRef = React.createRef();

  async componentDidMount() {
    if (this.props.isExisted) {
      const { currentUser, getOne, match } = this.props;

      await getOne(match.params.id, currentUser.token);
      this.setFormFieldsValueFromProps();
    }
  }

  setFormFieldsValueFromProps = () => {
    const { user } = this.props;

    if (user) {
      const { firstName, lastName, email } = user;

      this.formRef.current.setFieldsValue({
        firstName,
        lastName,
        email,
      });
    }
  };

  setFormFieldsValueFromValues = (values) => {
    this.formRef.current.setFieldsValue({
      ...values,
    });
  };

  onFinishMessage = (sucCb, errCb) => {
    const { errorMessage, successMessage } = this.props;

    if (successMessage) {
      message.success(successMessage);
      if (sucCb) sucCb();
    } else {
      this.setState({ errMess: true }, () => {
        message.error(errorMessage);
        if (errCb) errCb();
      });
    }
  };

  onFinish = async (values) => {
    const { isExisted, currentUser, post, put, match } = this.props;

    if (isExisted) {
      await put(match.params.id, values, currentUser.token);

      this.setFormFieldsValueFromValues(values);
      this.onFinishMessage();
    } else {
      await post({ ...values, role: 'admin' }, currentUser.token);

      const { errorMessage } = this.props;

      if (errorMessage) {
        this.setFormFieldsValueFromValues(values);
      } else {
        Object.keys(values).forEach(k => values[k] = null);
        this.setFormFieldsValueFromValues(values);
      }

      this.onFinishMessage();
    }
  };

  deleteItem = async () => {
    const { currentUser, user, delOne, logOut, match, history } = this.props;

    await delOne(match.params.id, currentUser.token);

    const { errorMessage, successMessage } = this.props;

    if (successMessage) {
      message.success(successMessage);

      if (currentUser._id === user._id) {
        logOut();
      }

      history.replace('/admins');
    } else {
      message.error(errorMessage);
    }
  };

  hideSpin = () => this.setState({ isSpinHidden: true });

  turnOnSaveLoading = () => {
    this.setState({
      saveLoading: true,
      delLoading: false,
    });

    this.hideSpin();
  };

  turnOnDelLoading = () => {
    this.setState({
      saveLoading: false,
      delLoading: true,
    });

    this.hideSpin();
  };

  renderForm = () => {
    const { isExisted, isLoading, errorMessage, currentUser, user } = this.props;
    const { errMess, saveLoading, delLoading } = this.state;

    return (
      <Form
        ref={this.formRef}
        layout="vertical"
        onFinish={this.onFinish}
        className={classNames({ 'd-none': (errorMessage && !errMess) })}
      >
        <FormActions
          deleteItem={this.deleteItem}
          isItemNew={!isExisted}
          saveLoading={saveLoading ? isLoading : false}
          delLoading={delLoading ? isLoading : false}
          turnOnSaveLoading={this.turnOnSaveLoading}
          turnOnDelLoading={this.turnOnDelLoading}
        />
        <div className="container-sm">
          <FormItem
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="email"
            label="Email"
            rules={[{ required: true }]}
          >
            <Input />
          </FormItem>
          {
            !isExisted ?
              <>
                <FormItem
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <InputPassword />
                </FormItem>
                <FormItem
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[{ required: true }]}
                >
                  <InputPassword />
                </FormItem>
              </> : null
          }
          {
            (isExisted && user && (currentUser._id === user._id)) ?
              <ChangePassModal
                setFormFieldsValue={this.setFormFieldsValueFromProps}
                onFinishMessage={this.onFinishMessage}
                user={user}
              /> : null

          }
        </div>
      </Form>
    );
  };

  render() {
    const { isLoading, errorMessage, match } = this.props;
    const { errMess, isSpinHidden } = this.state;

    return (
      <Layout title={match.path === '/admins/new' ? 'Add New Admin' : 'Edit Admin'}>
        {
          (errorMessage && !errMess) ?
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
            /> : null
        }
        {
          (isLoading && !isSpinHidden && !errorMessage) ?
            <Spin /> : this.renderForm()
        }
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOne: (id, token) => dispatch(getOne(id, token)),
  post: (data, token) => dispatch(post(data, token)),
  put: (id, data, token) => dispatch(put(id, data, token)),
  delOne: (id, token) => dispatch(delOne(id, token)),
  logOut: () => dispatch(logOut()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectLoading,
  user: selectUser,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);
