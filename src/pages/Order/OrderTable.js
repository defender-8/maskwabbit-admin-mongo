import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  EditFilled,
} from '@ant-design/icons';

import { getArr, delOne } from '../../redux/order/order-actions';

import BaseTable from '../../components/Table/BaseTable';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Alert/Alert';
import Tag from '../../components/Tag/Tag';

function OrderTable() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isLoading = useSelector(state => state.order.isLoading);
  const errorMessage = useSelector(state => state.order.errorMessage);
  const dataArr = useSelector(state => state.order.orders);
  const total = useSelector(state => state.order.total);

  const renderStatus = (status) => {
    let color;

    switch (status) {
      case 'In Progress':
        color = 'geekblue';
        break;
      case 'Fulfilled':
        color = 'green';
        break;
      case 'Canceled':
        color = 'volcano';
        break;
      default:
        color = 'blue';
        break;
    }

    return (
      <Tag color={color}>{status}</Tag>
    );
  };

  const columns = (confirmDelete) => [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('MM/DD/YYYY [at] hh:mm A'),
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total.toFixed(2)}`,
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'New',
          value: 'New',
        },
        {
          text: 'In Progress',
          value: 'In Progress',
        },
        {
          text: 'Fulfilled',
          value: 'Fulfilled',
        },
        {
          text: 'Canceled',
          value: 'Canceled',
        },
      ],
      render: (status) => renderStatus(status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <EditFilled className="mr-2" />
          {confirmDelete(record)}
        </>
      ),
    },
  ];

  return (
    <Layout title="Orders">
      {
        errorMessage ?
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
          /> :
          <BaseTable
            currentUser={currentUser}
            loading={isLoading}
            columns={columns}
            data={dataArr}
            total={total}
            getArr={getArr}
            delOne={delOne}
            actionPath={'orders'}
            routePath={'orders'}
            rowClassName="cursor-pointer"
            search={true}
            searchPlaceholder="Search by Number..."
          />
      }
    </Layout>
  );
}

export default OrderTable;
