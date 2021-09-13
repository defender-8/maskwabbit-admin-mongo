import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EditFilled,
} from '@ant-design/icons';
import moment from 'moment';
import qs from 'qs';

import { getArr, delOne } from '../../redux/category/category-actions';

import Layout from '../../App/Layout';
import { Spin, Table, Pagination, Avatar } from '../../base/components';
import { ArrayHeader, DeleteItem } from '../../components';

function CategoryTable({ history, match }) {
  const user = useSelector(state => state.auth.user);

  const isLoading = useSelector(state => state.category.isLoading);
  const errorMessage = useSelector(state => state.category.errorMessage);
  const dataArr = useSelector(state => state.category.categories);
  const total = useSelector(state => state.category.total);

  const dispatch = useDispatch();

  const [page, setPage] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState('');
  const [sorter, setSorter] = useState({ createdAt: 'desc' });
  const [filters, setFilters] = useState(null);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Avatar
          size="large"
          src={image}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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

  const stateQueryStr = qs.stringify({
    page,
    sorter,
    filters,
    search: searchValue,
  });
  // const userRoleQueryStr = `&role=${userRole || null}`;
  const urlQueryStr = stateQueryStr/* + userRoleQueryStr*/;

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
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getArr(`/admin/${match.url}?${urlQueryStr}`, user.token));
  }, [page, sorter, filters]);

  const deleteItem = async (record) => {
    await dispatch(delOne(record._id, user.token));

    /*if (user._id === record._id) {
      dispatch(logOut());
    }*/

    dispatch(getArr(`/admin/${match.url}?${urlQueryStr}`, user.token));
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
        history.push(match.url + '/' + record.id);
      },
    };
  };

  return (
    <Layout title="Categories">
      <ArrayHeader
        searchName="title"
        searchPlaceholder="Search by title..."
        onSearchChange={onSearchChange}
      />
      <Table
        loading={{
          spinning: isLoading,
          indicator: <Spin />,
        }}
        rowKey="id"
        dataSource={dataArr}
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

export default CategoryTable;
