import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import {
  DeleteFilled,
} from '@ant-design/icons';

import Table from './Table';
import Popconfirm from '../Popconfirm/Popconfirm';
import TableActions from './components/ActionsTopPanel';
import Pagination from '../Pagination/Pagination';

function BaseTable(
  {
    loading, columns, data, total, create, search, searchPlaceholder, currentUser, logOut, getArr, delOne, actionPath, routePath, userRole, onRowCustom, history, ...tableProps
  },
) {

  const [page, setPage] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState('');
  const [sorter, setSorter] = useState({ createdAt: 'desc' });
  const [filters, setFilters] = useState(null);

  const dispatch = useDispatch();

  const stateQueryStr = qs.stringify({
    page,
    sorter,
    filters,
    search: searchValue,
  });
  const userRoleQueryStr = `&role=${userRole || null}`;
  const urlQueryStr = stateQueryStr + userRoleQueryStr;

  const onPaginationChange = (page, pageSize) => {
    setPage({
      currentPage: page,
      pageSize,
    });
  };

  const onPaginationSizeChange = (current, size) => {
    setPage({
      currentPage: current,
      pageSize: size,
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
    dispatch(getArr(`/admin/${actionPath}?${urlQueryStr}`, currentUser.token));
  }, [page, sorter, filters]);

  const stopPropagation = (e) => e.stopPropagation();

  const deleteItem = async (record) => {
    await dispatch(delOne(record._id, currentUser.token));

    if (currentUser._id === record._id) {
      dispatch(logOut());
    }

    dispatch(getArr(`/admin/${actionPath}?${urlQueryStr}`, currentUser.token));
  };

  const cancelDelete = (e) => {

  };

  const confirmDelete = (record) =>
    <div onClick={stopPropagation} className="d-inline-block">
      <Popconfirm
        title="Are you sure to delete this item?"
        onConfirm={() => deleteItem(record)}
        onCancel={cancelDelete}
        okText="Yes"
        cancelText="Cancel"
      >
        <DeleteFilled />
      </Popconfirm>
    </div>;

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
    if (onRowCustom) {
      return onRowCustom(record, index);
    } else {
      return {
        onClick: e => {
          history.push(`/${routePath}/${record._id}`);
        },
      };
    }
  };

  return (
    <>
      <TableActions
        create={create}
        createPath={routePath}
        search={search}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={onSearchChange}
      />
      <Table
        loading={loading}
        rowKey="_id"
        dataSource={data}
        columns={columns(confirmDelete)}
        onChange={onChange}
        onRow={onRow}
        pagination={false}
        {...tableProps}
      />
      <div className="mt-3 text-right">
        <Pagination
          current={page.currentPage}
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={onPaginationChange}
          onShowSizeChange={onPaginationSizeChange}
        />
      </div>
    </>
  );
}

export default withRouter(BaseTable);
