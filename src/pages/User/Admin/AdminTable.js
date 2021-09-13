import React from 'react';
import { useSelector } from 'react-redux';

import { logOut } from '../../../redux/auth/auth-actions';
import { getArr, delOne } from '../../../redux/admin/admin-actions';

import UserTable from '../UserTable';

function AdminTable() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isLoading = useSelector(state => state.admin.isLoading);
  const errorMessage = useSelector(state => state.admin.errorMessage);
  const dataArr = useSelector(state => state.admin.users);
  const total = useSelector(state => state.admin.total);

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
      routePath="admins"
      role="admin"
      isEditable={true}
      pageTitle="Admins"
      rowClassName="cursor-pointer"
      create={true}
      search={true}
    />
  );
}

export default AdminTable;
