import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getById, post, put, remove } from '../../../redux/admin/actions';

import Layout from '../../../App/Layout';
import {
  Spin,
  Empty,
  GoBackButton,
  Form,
  FormItem,
  Input,
  InputPassword,
  notification,
} from '../../../base/components';
import { FormActions } from '../../../components';

function AdminForm({ match, history }) {
  const { params: { id }, url } = match;

  const { user: { token } } = useSelector(state => state.auth);
  const { loading, saving, removing, errorMessage, cudError, successMessage, dataSingle } = useSelector(
    state => state.admin);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(getById(token, id));
    }
  }, [id]);

  const setFormFieldsValueFromProps = () => {
    if (dataSingle) {
      const { firstName, lastName, email } = dataSingle;

      form.setFieldsValue({
        firstName,
        lastName,
        email,
      });
    }
  };

  useEffect(() => {
    if (id) {
      setFormFieldsValueFromProps();
    }
  }, [dataSingle]);

  useEffect(() => {
    if (successMessage) {
      notification(successMessage).success();
    }
  }, [successMessage]);

  useEffect(() => {
    const values = form.getFieldsValue();

    if (errorMessage) {
      notification(errorMessage).error();
    }

    form.setFieldsValue(values);
  }, [errorMessage]);

  const onFinish = async (values) => {
    if (!id) {
      await dispatch(post(token, values));

      form.resetFields();

    } else {
      await dispatch(put(token, id, values));

      form.setFieldsValue(values);
    }
  };

  const deleteItem = async () => {
    await dispatch(remove(token, id));
    history.replace(url.substring(0, url.indexOf(`/${id}`)));
  };

  return (
    <Layout title={!id ? 'Add New User' : 'Edit User'}>
      {
        loading ?
          <Spin /> : errorMessage && !cudError ?
          <>
            <GoBackButton />
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </> :
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <FormActions
              deleteItem={deleteItem}
              isItemNew={!id}
              saving={saving}
              removing={removing}
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
                rules={[
                  { required: true },
                  { type: 'email' },
                ]}
              >
                <Input />
              </FormItem>
              {
                !id ?
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
            </div>
          </Form>
      }
    </Layout>
  );
}

export default AdminForm;
