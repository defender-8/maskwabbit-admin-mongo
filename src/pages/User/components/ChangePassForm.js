import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { changePassword } from "../../../redux/modules/admin";

import {
  Form,
  FormItem,
  InputPassword,
  Button,
} from "../../../base/components";

function ChangePassForm({ userId, handleOk }) {
  const {
    user: { token },
  } = useSelector((state) => state.auth);
  const { saving } = useSelector((state) => state.admin);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    values.userId = userId;

    await dispatch(changePassword(token, values));
    form.resetFields();
    handleOk();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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
          loading={saving}
        >
          Save
        </Button>
      </FormItem>
    </Form>
  );
}

export default ChangePassForm;
