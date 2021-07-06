import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col, Popconfirm } from 'antd';
import {
  ArrowLeftOutlined,
} from '@ant-design/icons';

import Button from '../../Button/Button';

import './FormActions.scss';

function FormActions({ posAbsolute, history, deleteItem, isItemNew, saveLoading, delLoading, turnOnSaveLoading, turnOnDelLoading }) {
  const goBack = () => history.goBack();

  const cancelDelete = (e) => {
    console.log(e);
  };

  const deleteBtn = () => {
    if (!isItemNew) {
      return (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={deleteItem}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button
            type="primary"
            danger
            onClick={turnOnDelLoading}
            loading={delLoading}
            className="ml-2"
          >
            Delete
          </Button>
        </Popconfirm>
      );
    }
    return null;
  };

  return (
    <div className={classNames('FormActions', { 'FormActions-p-abs': posAbsolute })}>
      <Row justify="space-between">
        <Col flex="100px">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={goBack}
          >
            Back
          </Button>
        </Col>
        <Col flex="260px" className="text-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={saveLoading}
            onClick={turnOnSaveLoading}
            className="btn-success"
          >
            Save
          </Button>
          {deleteBtn()}
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(FormActions);
