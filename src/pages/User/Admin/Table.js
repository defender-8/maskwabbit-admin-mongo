import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EditFilled,
} from '@ant-design/icons';
import moment from 'moment';

import { get, remove } from '../../../redux/admin/actions';

import { useDidUpdateEffect } from '../../../base/hooks';

import Layout from '../../../App/Layout';
import { Spin, Table, Pagination, notification } from '../../../base/components';
import { ArrayHeader, DeleteItem } from '../../../components';

function AdminTable({ history, match, role }) {
  const { user: { token } } = useSelector(state => state.auth);
  const { loading, removing, errorMessage, dataArray, total } = useSelector(state => state.admin);

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
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: () => null,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: () => null,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      className: 'text-cap',
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
          <DeleteItem onDelete={onDelete} record={record} loading={removing} />
        </>
      ),
    },
  ];

  const queryParams = { page, sorter, filters, search, role }

  useEffect(() => {
    dispatch(get(token, queryParams));
  }, [page, sorter, filters]);

  useDidUpdateEffect(() => {
    if (errorMessage) {
      notification(errorMessage).error();
    }
  }, [errorMessage]);

  const onDelete = async (record) => {
    await dispatch(remove(token, record._id, queryParams));
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
    <Layout title="Admins">
      <ArrayHeader
        searchName="title"
        searchPlaceholder="Search by name..."
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

export default AdminTable;
