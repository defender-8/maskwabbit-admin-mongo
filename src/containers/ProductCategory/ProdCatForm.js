import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {
  getOne,
  post,
  put,
  delOne, getArr as getProdCats,
} from '../../redux/product-category/product-category-actions';

import Layout from '../../components/Layout/Layout';
import Input from '../../components/Form/Input/Input';
import Upload from '../../components/Form/Upload/Upload';
import TextArea from '../../components/Form/Input/TextArea';
import Spin from '../../components/Spin/Spin';
import Alert from '../../components/Alert/Alert';
import FormActions from '../../components/Form/FormActions/FormActions';

import { beforeImageUpload } from '../../utils/file';

function ProdCatForm({isExisted, match, history}) {
  const { currentUser } = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.prodCat.isLoading);
  const errorMessage = useSelector(state => state.prodCat.errorMessage);
  const successMessage = useSelector(state => state.prodCat.successMessage);
  const { prodCat } = useSelector(state => state.prodCat);

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errMess, setErrMess] = useState(false);
  const [isSpinHidden, setIsSpinHidden] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isExisted) {
      dispatch(getOne(match.params.id, currentUser.token));
    }
  }, []);

  const setFormFieldsValueFromProps = () => {
    if (prodCat) {
      const { title, image, description } = prodCat;

      form.setFieldsValue({
        title,
        image,
        description,
      });

      setImageUrl('/' + image)
    }
  };

  useEffect(() => {
    setFormFieldsValueFromProps();
  }, [prodCat]);

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
    history.replace('/product-categories');
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
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </div>
      </Form>
    );
  };

    return (
      <Layout
        title={match.path === '/product-categories/new' ? 'Add New Category' : 'Edit Category'}
      >
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

export default ProdCatForm;
