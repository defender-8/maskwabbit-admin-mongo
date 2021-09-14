import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  EditFilled,
} from '@ant-design/icons';
import moment from 'moment';

import { get, remove } from '../../redux/product/actions';
import { getArr as getCategories } from '../../redux/category/category-actions';

import { stopPropagation } from '../../base/utils/event';

import Layout from '../../App/Layout';
import { Spin, Table, Pagination, Avatar, Tag } from '../../base/components';
import { ArrayHeader, DeleteItem } from '../../components';

function ProductTable({ history, match }) {
  const { user: { token } } = useSelector(state => state.auth);
  const { categories } = useSelector(state => state.category);
  const { loading, errorMessage, dataArray, total } = useSelector(state => state.product);

  const dispatch = useDispatch();

  const [page, setPage] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const [search, setSearch] = useState('');
  const [sorter, setSorter] = useState({ createdAt: 'desc' });
  const [filters, setFilters] = useState(null);

  const columns = [
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
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
      sorter: () => null,
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (productCategories) =>
        productCategories.map(c => (
            <Tag onClick={stopPropagation}>
              <Link to={`categories/${c._id}`}>{c.title}</Link>
            </Tag>
          ),
        ),
      filters: categories?.map(c => ({text: c.title, value: c._id})),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: () => null,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('MM/DD/YYYY'),
      sorter: () => null,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <EditFilled className="mr-2" />
          <DeleteItem delFunc={deleteItem} record={record} />
          {/*<DeleteItem delFunc={deleteItem} record={record} loading={delLoading} />*/}
        </>
      ),
    },
  ];

  const queryParams = { page, sorter, filters, search }

  useEffect(() => {
    dispatch(get(queryParams, token));
    dispatch(getCategories(`/dashboard/categories`, token));
  }, [page, sorter, filters]);

  const deleteItem = async (record) => {
    await dispatch(remove(record._id, token));

    /*if (user._id === record._id) {
      dispatch(logOut());
    }*/

    dispatch(get(queryParams, token));
  };

  const onPaginationChange = (page, pageSize) => {
    setPage({
      currentPage: page,
      pageSize,
    });
  };

  const onSearchChange = (e) => {
    setPage({
      ...page,
      currentPage: 1,
    });
    setSearch(e.target.value);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('>>>>>sorter:\n', sorter, '\n>>>>>filters:\n', filters);

    const { field, order } = sorter;

    if (order) {
      const sortOrder = order.slice(0, -3);

      setSorter({
        [field]: sortOrder,
      });
    } else {
      setSorter({
        createdAt: 'desc',
      });
    }

    setFilters({ ...filters });
  };

  const onRow = (record, index) => {
    return {
      onClick: e => {
        history.push(match.url + '/' + record._id);
      },
    };
  };

  return (
    <Layout title="Products">
      <ArrayHeader
        searchName="title"
        searchPlaceholder="Search by title..."
        onSearchChange={onSearchChange}
      />
      <Table
        loading={{
          spinning: loading,
          indicator: <Spin />,
        }}
        rowKey="id"
        dataSource={dataArray}
        columns={columns}
        onChange={onChange}
        onRow={onRow}
        rowClassName="cursor-pointer"
        pagination={false}
      />
      <div className="mt-3 text-right">
        <Pagination
          current={page.currentPage}
          pageSize={page.pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={onPaginationChange}
          onShowSizeChange={onPaginationChange}
        />
      </div>
    </Layout>
  );
}

export default ProductTable;
