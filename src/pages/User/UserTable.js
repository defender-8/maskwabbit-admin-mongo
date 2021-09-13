import React from 'react';
import {
  EditFilled,
} from '@ant-design/icons';

import BaseTable from '../../components/Table/BaseTable';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Alert/Alert';
import moment from 'moment';

function UserTable(
  {
    currentUser, logOut, isLoading, errorMessage, dataArr, total, create, search, getArr, delOne, actionPath, routePath, role, pageTitle, onRowCustom, ...tableProps
  },
) {
  const columns = (confirmDelete) => [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: () => null,
      sortDirections: ['ascend', 'descend'],
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
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          {create ? <EditFilled className="mr-2" /> : null}
          {confirmDelete(record)}
        </>
      ),
    },
  ];

  return (
    <Layout title={pageTitle}>
      {
        errorMessage ?
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
          /> :
          <div>
            <BaseTable
              loading={isLoading}
              columns={columns}
              data={dataArr}
              total={total}
              actionPath={actionPath}
              routePath={routePath}
              userRole={role}
              currentUser={currentUser}
              logOut={logOut}
              getArr={getArr}
              delOne={delOne}
              onRowCustom={onRowCustom}
              create={create}
              search={search}
              searchPlaceholder="Search by Name..."
              {...tableProps}
            />
          </div>
      }
    </Layout>
  );
}

export default UserTable;
