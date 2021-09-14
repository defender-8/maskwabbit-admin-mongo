import React from 'react';
import {
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectUser,
} from '../../../../redux/auth/auth-selectors';

import { Dropdown } from '../../../../base/components';
import UserMenu from './UserMenu';

import './index.less';

function UserDropdown({ user }) {

  return (
    <Dropdown overlay={<UserMenu />} className="UserDropdown">
      <div className="text-link">
        <UserOutlined /> {user.firstName} <DownOutlined />
      </div>
    </Dropdown>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(UserDropdown);
