import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
} from '../../../redux/auth/auth-selectors';
import { postChangePassword } from '../../../redux/admin/admin-actions';

import Form from '../../../components/Form/Form';
import FormItem from '../../../components/Form/FormItem';
import InputPassword from '../../../components/Form/Input/InputPassword';
import Button from '../../../components/Button/Button';

function ChangePassForm({ postChangePassword, currentUser, user, setFormFieldsValue, onFinishMessage, handleOk }) {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => setLoading(loading => !loading);

  const onFinish = async values => {
    toggleLoading();

    values.userId = user._id;

    await postChangePassword(values, currentUser.token);
    toggleLoading();

    setFormFieldsValue();
    onFinishMessage(handleOk);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
    >
      <FormItem
        name="currentPassword"
        label="Current Password"
        rules={[{ required: true }]}
      >
        <InputPassword />
      </FormItem>
      <FormItem
        name="newPassword"
        label="New Password"
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
  );
}

const mapDispatchToProps = dispatch => ({
  postChangePassword: (data, token) => dispatch(postChangePassword(data, token)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassForm);
