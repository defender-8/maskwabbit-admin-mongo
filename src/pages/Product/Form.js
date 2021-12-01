import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getById, post, put, remove } from "../../redux/modules/product";

import { useDidUpdateEffect } from "../../base/hooks";
import useUploadImage from "../../base/components/Upload/UploadImage/useUploadImage";

import Layout from "../../App/Layout";
import {
  Spin,
  Empty,
  GoBackButton,
  Form,
  FormItem,
  Input,
  InputNumber,
  UploadImage,
  notification,
  Row,
  Col,
} from "../../base/components";
import { FormActions } from "../../components";
import SelectCategory from "./components/SelectCategory";

function ProductForm({ match, history }) {
  const {
    params: { id },
    url,
  } = match;

  const {
    user: { token },
  } = useSelector((state) => state.auth);
  const {
    loading,
    saving,
    removing,
    getError,
    errorMessage,
    successMessage,
    dataSingle,
  } = useSelector((state) => state.product);

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
      const { title, image, price, amount, categories } = dataSingle;

      form.setFieldsValue({
        title,
        image,
        price,
        amount,
        categories,
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

    Object.keys(values).forEach((key) => formData.append(key, values[key]));

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
    <Layout title={!id ? "Add New Product" : "Edit Product"}>
      {loading ? (
        <Spin />
      ) : getError ? (
        <>
          <GoBackButton />
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <FormActions
            deleteItem={deleteItem}
            isItemNew={!id}
            saving={saving}
            removing={removing}
          />
          <div className="container-sm">
            <FormItem name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </FormItem>
            <FormItem name="image" label="Image" rules={[{ required: true }]}>
              <UploadImage
                token={token}
                onChange={onChange}
                imageLoading={imageLoading}
                imageUrl={imageUrl}
              />
            </FormItem>
            <Row gutter={16}>
              <Col sm={24} md={8}>
                <FormItem
                  name="categories"
                  label="Categories:"
                  rules={[{ required: true }]}
                >
                  <SelectCategory />
                </FormItem>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item
                  name="price"
                  label="Price:"
                  rules={[{ required: true }]}
                >
                  <InputNumber step={0.1} />
                </Form.Item>
              </Col>
              <Col sm={24} md={8}>
                <Form.Item
                  name="amount"
                  label="Amount:"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <FormItem name="description" label="Description">
              <Input.TextArea rows={3} />
            </FormItem>
          </div>
        </Form>
      )}
    </Layout>
  );
}

export default ProductForm;
