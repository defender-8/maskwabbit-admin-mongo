import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { getOne, post, put, delOne } from '../../redux/product/product-actions';
import { getArr as getProdCats } from '../../redux/product-category/product-category-actions';

import Layout from '../../components/Layout/Layout';
import Input from '../../components/Form/Input/Input';
import Upload from '../../components/Form/Upload/Upload';
import InputNumber from '../../components/Form/Input/InputNumber';
import TextArea from '../../components/Form/Input/TextArea';
import Select from '../../components/Form/Select/Select';
import Option from '../../components/Form/Select/Option';
import Spin from '../../components/Spin/Spin';
import Alert from '../../components/Alert/Alert';
import FormActions from '../../components/Form/FormActions/FormActions';

import { beforeImageUpload } from '../../utils/file';

function ProductForm({ isExisted, match, history }) {
  const { currentUser } = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.product.isLoading);
  const errorMessage = useSelector(state => state.product.errorMessage);
  const successMessage = useSelector(state => state.product.successMessage);
  const { product } = useSelector(state => state.product);
  const { prodCats } = useSelector(state => state.prodCat);

  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errMess, setErrMess] = useState(false);
  const [isSpinHidden, setIsSpinHidden] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isExisted) {
      dispatch(getOne(match.params.id, currentUser.token));
      dispatch(getProdCats(`/admin/product-categories`, currentUser.token));
    } else {
      dispatch(getProdCats(`/admin/product-categories`, currentUser.token));
    }
  }, []);

  const setFormFieldsValueFromProps = () => {
    if (product) {
      const { title, image, price, amount, productCategory } = product;

      form.setFieldsValue({
        title,
        image,
        price,
        amount,
        productCategory,
      });

      setImageUrl('/' + image);
    }
  };

  useEffect(() => {
    setFormFieldsValueFromProps();
  }, [product]);

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

    if (!isExisted) {
      await dispatch(post(formData, currentUser.token));

      form.resetFields();
      setImageUrl(null);

    } else {
      await dispatch(put(match.params.id, formData, currentUser.token));

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
    await dispatch(delOne(match.params.id, currentUser.token));
    history.replace('/products');
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

  const renderCategories = () => {
    if (prodCats) {
      return (
        <Select>
          {
            prodCats.map(pc => <Option key={pc._id} value={pc._id}>{pc.title}</Option>)
          }
        </Select>
      );
    }

    return null;
  };

  const renderForm = () => {
    const uploadButton = (
      <div>
        {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={classNames({ 'd-none': (errorMessage && !errMess) })}
      >
        <FormActions
          deleteItem={deleteItem}
          isItemNew={!isExisted}
          saveLoading={saveLoading ? isLoading : false}
          delLoading={delLoading ? isLoading : false}
          turnOnSaveLoading={turnOnSaveLoading}
          turnOnDelLoading={turnOnDelLoading}
        />
        <div className="container-sm">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <div className="d-inline-block mr-2">
            <Form.Item
              name="image"
              label="Image"
              rules={[{ required: true }]}
            >
              <Upload
                name="image"
                accept=".jpeg,.jpg,.png"
                listType="picture-card"
                showUploadList={false}
                action="/admin/upload"
                beforeUpload={beforeImageUpload}
                onChange={handleUploadChange}
                headers={
                  { 'Authorization': 'Bearer ' + currentUser.token }
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
                  : uploadButton
                }
              </Upload>
            </Form.Item>
          </div>
          <div className="d-inline-block min-w-280 mr-2">
            <Form.Item
              name="productCategory"
              label="Product Category"
              rules={[{ required: true }]}
            >
              {renderCategories()}
            </Form.Item>
          </div>
          <div className="d-inline-block mr-2">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true }]}
            >
              <InputNumber step={0.1} />
            </Form.Item>
          </div>
          <div className="d-inline-block">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3} />
          </Form.Item>
        </div>
      </Form>
    );
  };

  return (
      <Layout title={match.path === '/products/new' ? 'Add New Product' : 'Edit Product'}>
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
            <Spin /> : renderForm()
        }
      </Layout>
  );
}

export default ProductForm;
