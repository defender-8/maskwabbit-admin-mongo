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

import { useDidUpdateEffect } from '../../base/hooks';

import Layout from '../../App/Layout';
import { Spin, Table, Pagination, Avatar, Tag, message, notification } from '../../base/components';
import { ArrayHeader, DeleteItem } from '../../components';

function ProductTable({ history, match }) {
  const { user: { token } } = useSelector(state => state.auth);
  const { categories } = useSelector(state => state.category);
  const { loading, errorMessage, dataArray, total } = useSelector(state => state.product);

  const dispatch = useDispatch();

  const [page, setPage] = useState({
    current: 1,
    size: 10,
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
          <DeleteItem onDelete={onDelete} record={record} />
        </>
      ),
    },
  ];

  const queryParams = { page, sorter, filters, search }

  useEffect(() => {
    dispatch(get(queryParams, token));
    dispatch(getCategories(`/dashboard/categories`, token));
  }, [page, sorter, filters]);

  useDidUpdateEffect(() => {
    if (errorMessage) {
      notification.error({
        message: 'Error',
        description: errorMessage,
        duration: 0,
      });
    }
  }, [errorMessage]);

  const onDelete = async (record) => {
    await dispatch(remove(record._id, queryParams, token));
  };

  const onPaginationChange = (current, size) => {
    setPage({
      current,
      size,
    });
  };

  const onSearchChange = (e) => {
    setPage({
      ...page,
      current: 1,
    });
    setSearch(e.target.value);
  };

  const onChange = (pagination, filters, sorter, extra) => {
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
          current={page.current}
          pageSize={page.size}
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
