import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "../../redux/auth/actions";

import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  notification,
} from "../../base/components";
import Layout from "./Layout";

function SignIn({ history }) {
  const { loading, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    const values = form.getFieldsValue();

    if (errorMessage) {
      notification(errorMessage).error();

      form.setFieldsValue(values);
    }

    if (successMessage) {
      notification(successMessage).success();

      history.replace("/");
    }
  }, [errorMessage, successMessage]);

  const onFinish = async (values) => {
    await dispatch(signIn(values));
  };

  return (
    <Layout>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormItem
          name="email"
          label="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </FormItem>
        <FormItem name="password" label="Password" rules={[{ required: true }]}>
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

export default SignIn;
