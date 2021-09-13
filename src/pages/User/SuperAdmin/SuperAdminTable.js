import React from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import { logOut } from '../../../redux/auth/auth-actions';
import { getArr, delOne } from '../../../redux/admin/admin-actions';

import UserTable from '../UserTable';

function SuperAdminTable({ history }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isLoading = useSelector(state => state.admin.isLoading);
  const errorMessage = useSelector(state => state.admin.errorMessage);
  const dataArr = useSelector(state => state.admin.users);
  const total = useSelector(state => state.admin.total);

  const onRow = (record, index) => {
    return {
      onClick: e => {
        if (record._id === currentUser._id) {
          history.push(`/super-admins/${record._id}`);
        } else {
          message.error('Access is not allowed!');
        }
      },
    };
  };

  return (
    <UserTable
      currentUser={currentUser}
      logOut={logOut}
      isLoading={isLoading}
      errorMessage={errorMessage}
      dataArr={dataArr}
      total={total}
      getArr={getArr}
      delOne={delOne}
      actionPath="admins"
      routePath="super-admins"
      role="super admin"
      isEditable={true}
      pageTitle="Super Admins"
      onRowCustom={onRow}
      rowClassName="cursor-pointer"
      create={true}
      search={true}
    />
  );
}

export default SuperAdminTable;
