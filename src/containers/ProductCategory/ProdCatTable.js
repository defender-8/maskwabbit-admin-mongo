import React from 'react';
import { useSelector } from 'react-redux';
import {
  EditFilled,
} from '@ant-design/icons';

import { getArr, delOne } from '../../redux/product-category/product-category-actions';

import BaseTable from '../../components/Table/BaseTable';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Alert/Alert';
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';

function ProdCatTable() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isLoading = useSelector(state => state.prodCat.isLoading);
  const errorMessage = useSelector(state => state.prodCat.errorMessage);
  const dataArr = useSelector(state => state.prodCat.prodCats);
  const total = useSelector(state => state.prodCat.total);

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
    <Layout title="Product Categories">
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
            actionPath="product-categories"
            routePath="product-categories"
            rowClassName="cursor-pointer"
            create={true}
            search={true}
            searchPlaceholder="Search by Title..."
          />
      }
    </Layout>
  );
}

export default ProdCatTable;
