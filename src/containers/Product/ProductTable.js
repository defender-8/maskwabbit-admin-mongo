import React from 'react';
import { useSelector } from 'react-redux';
import {
  EditFilled,
} from '@ant-design/icons';

import { getArr, delOne } from '../../redux/product/product-actions';

import BaseTable from '../../components/Table/BaseTable';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Alert/Alert';
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';

function ProductTable() {
  const currentUser = useSelector(state => state.auth.currentUser);

  const isLoading = useSelector(state => state.product.isLoading);
  const errorMessage = useSelector(state => state.product.errorMessage);
  const dataArr = useSelector(state => state.product.products);
  const total = useSelector(state => state.product.total);

  const columns = (confirmDelete) => [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => {
        return (
          <Avatar
            size="large"
            src={image}
          />
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Category',
      dataIndex: ['productCategory', 'title'],
      key: 'productCategory',
      filters: [
        {
          text: 'Gloves',
          value: 'Gloves',
        },
        {
          text: 'Gowns',
          value: 'Gowns',
        },
        {
          text: 'Masks',
          value: 'Masks',
        },
        {
          text: 'Sanitizer',
          value: 'Sanitizer',
        },
      ],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('MM/DD/YYYY'),
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
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
    <Layout title="Products">
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
            actionPath="products"
            routePath="products"
            rowClassName="cursor-pointer"
            create={true}
            search={true}
            searchPlaceholder="Search by Title..."
          />
      }
    </Layout>
  );
}

export default ProductTable;
