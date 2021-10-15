import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getById, post, put, remove } from '../../redux/category/actions';

import { useDidUpdateEffect } from '../../base/hooks';
import useUploadImage from '../../base/components/Upload/UploadImage/useUploadImage';

import Layout from '../../App/Layout';
import {
  Spin,
  Empty,
  GoBackButton,
  Form,
  FormItem,
  Input,
  UploadImage,
  notification,
} from '../../base/components';
import { FormActions } from '../../components';

function CategoryForm({ match, history }) {
  const { params: { id }, url } = match;

  const { user: { token } } = useSelector(state => state.auth);
  const { loading, saving, removing, getError, errorMessage, successMessage, dataSingle } = useSelector(
    state => state.category);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { onChange, imageLoading, imageUrl } = useUploadImage();

  useEffect(() => {
    if (id) {
      dispatch(getById(token, id));
    }
  }, [id]);

  const setFormFieldsValueFromProps = () => {
    if (dataSingle) {
      const { title, image, description } = dataSingle;

      form.setFieldsValue({
        title,
        image,
        description
      });
    }
  };

  useEffect(() => {
    if (id) {
      setFormFieldsValueFromProps();
    }
  }, [dataSingle]);

  useDidUpdateEffect(() => {
    const values = form.getFieldsValue();

    if (errorMessage) {
      notification(errorMessage).error();

      form.setFieldsValue(values);
    }

    if (successMessage) {
      notification(successMessage).success();
    }
  }, [errorMessage, successMessage]);

  const onFinish = async (values) => {
    if (values.image.file) {
      values.image = values.image.file.originFileObj;
    }

    const formData = new FormData();

    Object.keys(values).forEach(key => formData.append(key, values[key]));

    if (!id) {
      await dispatch(post(token, formData));

      form.resetFields();

    } else {
      await dispatch(put(token, id, formData));

      form.setFieldsValue(values);
    }
  };

  const deleteItem = async () => {
    await dispatch(remove(token, id));
    history.replace(url.substring(0, url.indexOf(`/${id}`)));
  };

  return (
    <Layout title={!id ? 'Add New Category' : 'Edit Category'}>
      {
        loading ?
          <Spin /> : getError ?
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
                name="title"
                label="Title:"
                rules={[{ required: true }]}
              >
                <Input />
              </FormItem>
              <FormItem
                name="image"
                label="Image:"
                rules={[{ required: true }]}
              >
                <UploadImage
                  token={token}
                  onChange={onChange}
                  imageLoading={imageLoading}
                  imageUrl={imageUrl}
                />
              </FormItem>
              <FormItem
                name="description"
                label="Description:"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </FormItem>
            </div>
          </Form>
      }
    </Layout>
  );
}

export default CategoryForm;
