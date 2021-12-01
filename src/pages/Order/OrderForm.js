import React, { Component } from "react";
import moment from "moment";
import classNames from "classnames";
import { Form, message, Row, Col } from "antd";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getOne, put, delOne } from "../../redux/order/order-actions";
import { selectCurrentUser } from "../../redux/auth/auth-selectors";
import {
  selectLoading,
  selectOrder,
  selectSuccessMessage,
  selectErrorMessage,
} from "../../redux/order/order-selectors";

import Layout from "../../components/Layout/Layout";
import Select from "../../components/Form/Select/Select";
import Option from "../../components/Form/Select/Option";
import Spin from "../../components/Spin/Spin";
import Alert from "../../components/Alert/Alert";
import FormActions from "../../components/Form/FormActions/FormActions";
import InfoItem from "../../components/InfoItem/InfoItem";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem";
import OrderProdItem from "./components/OrderProdItem";

class OrderForm extends Component {
  state = {
    errMess: false,
    isSpinHidden: false,
    saveLoading: false,
    delLoading: false,
  };

  formRef = React.createRef();

  async componentDidMount() {
    const { currentUser, getOne, match } = this.props;

    await getOne(match.params.id, currentUser.token);

    this.setFormFieldsValueFromProps();
  }

  setFormFieldsValueFromProps = () => {
    const { order } = this.props;

    if (order) {
      const { status } = order;
      this.formRef.current.setFieldsValue({ status });
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
    const { currentUser, put, match } = this.props;

    await put(match.params.id, values, currentUser.token);

    this.setFormFieldsValueFromValues(values);
    this.onFinishMessage();
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

    history.replace("/orders");
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

  renderStatuses = () => (
    <Select>
      <Option key="new" value="New">
        New
      </Option>
      <Option key="inProgress" value="In Progress">
        In Progress
      </Option>
      <Option key="fulfilled" value="Fulfilled">
        Fulfilled
      </Option>
      <Option key="canceled" value="Canceled">
        Canceled
      </Option>
    </Select>
  );

  renderOrderInfo = () => {
    const { order } = this.props;

    if (order) {
      const { user } = order;
      const { fullName, email } = user;

      return (
        <section>
          <h2>Client Information</h2>
          <InfoItem title="Client Name:" content={fullName} inline={true} />
          <InfoItem title="Client Email:" content={email} inline={true} />
        </section>
      );
    }

    return null;
  };

  renderFormSection = () => {
    const isExisted = true;
    const { isLoading, order } = this.props;
    const { saveLoading, delLoading } = this.state;

    if (order) {
      const { number, createdAt } = order;

      return (
        <section>
          <h2>Order #{number}</h2>
          <InfoItem
            title="Created:"
            content={moment(createdAt).format("MM/DD/YYYY [at] hh:mm A")}
            inline={true}
          />
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <FormActions
              posAbsolute={true}
              deleteItem={this.deleteItem}
              isItemNew={!isExisted}
              saveLoading={saveLoading ? isLoading : false}
              delLoading={delLoading ? isLoading : false}
              turnOnSaveLoading={this.turnOnSaveLoading}
              turnOnDelLoading={this.turnOnDelLoading}
            />
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              {this.renderStatuses()}
            </Form.Item>
          </Form>
        </section>
      );
    }

    return null;
  };

  renderProducts = () => {
    const { order } = this.props;

    if (order) {
      const { products, total } = order;

      const renderItem = (item) => {
        const { product, quantity } = item;
        const { image, title, price, _id } = product;

        return (
          <ListItem>
            <OrderProdItem
              image={image}
              title={title}
              price={price}
              quantity={quantity}
              prodId={_id}
            />
          </ListItem>
        );
      };

      return (
        <section>
          <h2>Products</h2>
          <div className="text-right fw-700 mt-min-3">
            Total: {`$${total.toFixed(2)}`}
          </div>
          <List dataSource={products} renderItem={(item) => renderItem(item)} />
        </section>
      );
    }

    return null;
  };

  render() {
    const { isLoading, errorMessage, order } = this.props;
    const { errMess, isSpinHidden } = this.state;

    return (
      <Layout title="Edit Order" containerPdTop={true}>
        {errorMessage && !errMess ? (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
          />
        ) : null}
        {isLoading && !isSpinHidden && !errorMessage ? (
          <Spin />
        ) : (
          <div className={classNames({ "d-none": errorMessage && !errMess })}>
            <div className="container-lg">
              <Row gutter={64}>
                <Col span={8} className="pos-static">
                  {this.renderFormSection()}
                  {this.renderOrderInfo()}
                </Col>
                <Col span={16}>{this.renderProducts()}</Col>
              </Row>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOne: (id, token) => dispatch(getOne(id, token)),
  put: (id, data, token) => dispatch(put(id, data, token)),
  delOne: (id, token) => dispatch(delOne(id, token)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectLoading,
  order: selectOrder,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
