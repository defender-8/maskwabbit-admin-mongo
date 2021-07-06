import React from 'react';
import { useSelector } from 'react-redux';

import { logOut } from '../../../redux/auth/auth-actions';
import { getArr, delOne } from '../../../redux/client/client-actions';

import UserTable from '../UserTable';

function ClientTable({}) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isLoading = useSelector(state => state.client.isLoading);
  const errorMessage = useSelector(state => state.client.errorMessage);
  const dataArr = useSelector(state => state.client.users);
  const total = useSelector(state => state.client.total);

  const onRow = (record, index) => null;

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
      actionPath="clients"
      routePath="clients"
      pageTitle="Clients"
      onRowCustom={onRow}
      search={true}
    />
  );
}

export default ClientTable;

