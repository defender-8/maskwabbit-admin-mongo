import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Row, Col, Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getOne,
  post,
  put,
  delOne,
} from '../../redux/product-category/product-category-actions';
import { selectCurrentUser } from '../../redux/auth/auth-selectors';
import {
  selectLoading,
  selectProdCat,
  selectSuccessMessage,
  selectErrorMessage,
} from '../../redux/product-category/product-category-selectors';

import Layout from '../../components/Layout/Layout';
import Input from '../../components/Form/Input/Input';
import Upload from '../../components/Form/Upload/Upload';
import TextArea from '../../components/Form/Input/TextArea';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Spin from '../../components/Spin/Spin';
import Alert from '../../components/Alert/Alert';
import FormActions from '../../components/Form/FormActions/FormActions';

import { beforeImageUpload } from '../../utils/file';

class ProdCatForm extends Component {
  state = {
    imageUrl: null,
    loading: false,
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
    const { prodCat } = this.props;

    if (prodCat) {
      const { title, image, description } = prodCat;

      this.formRef.current.setFieldsValue({
        title,
        image,
        description,
      });

      this.setState({ imageUrl: '/' + image });
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

    if (values.image.file) {
      values.image = values.image.file.originFileObj;
    }

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('image', values.image);


    if (!isExisted) {
      await post(formData, currentUser.token);

      const { errorMessage } = this.props;

      if (errorMessage) {
        this.setFormFieldsValueFromValues(values);
      } else {
        Object.keys(values).forEach(k => values[k] = null);
        this.setFormFieldsValueFromValues(values);
        this.setState({ imageUrl: null });
      }

      this.onFinishMessage();
    } else {
      await put(match.params.id, formData, currentUser.token);

      this.setFormFieldsValueFromValues(values);
      this.onFinishMessage();
    }
  };

  handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: '/' + info.file.response.imagePath,
        loading: false,
      });
    }
  };

  deleteItem = async () => {
    const { currentUser, delOne, match, history } = this.props;

    await delOne(match.params.id, currentUser.token);
    const { errorMessage, successMessage } = this.props;

    if (successMessage) {
      message.success(successMessage);
    } else {
      message.error(errorMessage);
    }

    history.replace('/product-categories');
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
    const { isExisted, currentUser, isLoading } = this.props;
    const { imageUrl, loading, saveLoading, delLoading } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <Form
        ref={this.formRef}
        layout="vertical"
        onFinish={this.onFinish}
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
              onChange={this.handleUploadChange}
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

  render() {
    const { isExisted, isLoading, errorMessage, match } = this.props;
    const { errMess, isSpinHidden } = this.state;

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
            <Spin /> :
            <div className={classNames({ 'd-none': (errorMessage && !errMess) })}>
              {this.renderForm()}
            </div>
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
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectLoading,
  prodCat: selectProdCat,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProdCatForm);
