import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { getById, post, put, remove } from '../../redux/product/actions';

import { beforeImageUpload } from '../../utils/file';

import Layout from '../../App/Layout';
import { Spin, Form, FormItem, Input, InputNumber, Upload, Alert, message, Row, Col } from '../../base/components';
import { FormActions } from '../../components';
import SelectCategory from './components/SelectCategory';

function ProductForm({ match, history }) {
  const { params: { id }, url } = match;

  const { user } = useSelector(state => state.auth);
  const { loading, errorMessage, successMessage, dataSingle } = useSelector(state => state.product);

  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errMess, setErrMess] = useState(false);
  const [isSpinHidden, setIsSpinHidden] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(getById(id, user.token));
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

      setImageUrl('/' + image);
    }
  };

  useEffect(() => {
    setFormFieldsValueFromProps();
  }, [dataSingle]);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    const values = form.getFieldsValue();

    if (errorMessage) {
      setErrMess(true);
      message.error(errorMessage);
    }

    form.setFieldsValue(values);
  }, [errorMessage]);

  const onFinish = async (values) => {
    if (values.image.file) {
      values.image = values.image.file.originFileObj;
    }

    const formData = new FormData();

    Object.keys(values).forEach(key => formData.append(key, values[key]));

    if (!id) {
      await dispatch(post(formData, user.token));

      form.resetFields();
      setImageUrl(null);

    } else {
      await dispatch(put(id, formData, user.token));

      form.setFieldsValue(values);
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {

      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageLoading(false);
      setImageUrl('/' + info.file.response.imagePath);
    }
  };

  const deleteItem = async () => {
    await dispatch(remove(id, user.token));
    history.replace(url.substring(0, url.indexOf(`/${id}`)));
  };

  const turnOnSaveLoading = () => {
    setSaveLoading(true);
    setDelLoading(false);
    setIsSpinHidden(true);
  };

  const turnOnDelLoading = () => {
    setSaveLoading(false);
    setDelLoading(true);
    setIsSpinHidden(true);
  };

  return (
    <Layout title={!id ? 'Add New Product' : 'Edit Product'}>
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
        (loading && !isSpinHidden && !errorMessage) ?
          <Spin /> : (
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <FormActions
                deleteItem={deleteItem}
                isItemNew={!id}
                saveLoading={saveLoading ? loading : false}
                delLoading={delLoading ? loading : false}
                turnOnSaveLoading={turnOnSaveLoading}
                turnOnDelLoading={turnOnDelLoading}
              />
              <div className="container-sm">
                <FormItem
                  name="title"
                  label="Title"
                  rules={[{ required: true }]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  name="image"
                  label="Image"
                  rules={[{ required: true }]}
                >
                  <Upload
                    name="image"
                    accept=".jpeg,.jpg,.png"
                    listType="picture-card"
                    showUploadList={false}
                    action="/dashboard/upload"
                    beforeUpload={beforeImageUpload}
                    onChange={handleUploadChange}
                    headers={
                      { 'Authorization': 'Bearer ' + user.token }
                    }
                  >
                    {imageUrl ?
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                        }} />
                      : (
                        <div>
                          {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )
                    }
                  </Upload>
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
                <FormItem
                  name="description"
                  label="Description"
                >
                  <Input.TextArea rows={3} />
                </FormItem>
              </div>
            </Form>
          )
      }
    </Layout>
  );
}

export default ProductForm;
