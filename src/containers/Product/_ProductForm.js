import React, { Component } from 'react';
import classNames from 'classnames';
import { Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getOne,
  post,
  put,
  delOne,
} from '../../redux/product/product-actions';
import {
  getArr as getProdCats,
} from '../../redux/product-category/product-category-actions';
import { selectCurrentUser } from '../../redux/auth/auth-selectors';
import {
  selectLoading,
  selectProduct,
  selectSuccessMessage,
  selectErrorMessage,
} from '../../redux/product/product-selectors';
import {
  selectProdCats,
} from '../../redux/product-category/product-category-selectors';

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

class ProductForm extends Component {
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
    const { isExisted, currentUser, getProdCats } = this.props;

    if (isExisted) {
      const { getOne, match } = this.props;

      await getOne(match.params.id, currentUser.token);
      await getProdCats(`/admin/product-categories`, currentUser.token);

      this.setFormFieldsValueFromProps();

    } else {
      getProdCats(`/admin/product-categories`, currentUser.token);
    }
  }

  setFormFieldsValueFromProps = () => {
    const { product } = this.props;

    if (product) {
      const { title, image, price, amount, productCategory } = product;

      this.formRef.current.setFieldsValue({
        title,
        image,
        price,
        amount,
        productCategory,
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
    formData.append('image', values.image);
    formData.append('productCategory', values.productCategory);
    formData.append('price', values.price);
    formData.append('amount', values.amount);

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

    history.replace('/products');
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

  renderCategories = () => {
    const { prodCats } = this.props;
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

  renderForm = () => {
    const { isExisted, currentUser, isLoading, errorMessage } = this.props;
    const { imageUrl, loading, errMess, saveLoading, delLoading } = this.state;

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
        className={classNames({ 'd-none': (errorMessage && !errMess) })}
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
          </div>
          <div className="d-inline-block min-w-280 mr-2">
            <Form.Item
              name="productCategory"
              label="Product Category"
              rules={[{ required: true }]}
            >
              {this.renderCategories()}
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

  render() {
    const { isLoading, errorMessage, match } = this.props;
    const { errMess, isSpinHidden } = this.state;

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
            <Spin /> : this.renderForm()
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
  getProdCats: (endpoint, token) => dispatch(getProdCats(endpoint, token)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectLoading,
  product: selectProduct,
  prodCats: selectProdCats,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
