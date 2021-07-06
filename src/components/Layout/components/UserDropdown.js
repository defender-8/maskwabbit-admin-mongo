import React from 'react';
import {
  DownOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
} from '../../../redux/auth/auth-selectors';

import Dropdown from '../../Dropdown/Dropdown';
import UserMenu from '../../Menu/UserMenu/UserMenu';

import './UserDropdown.scss';

function UserDropdown({ currentUser }) {

  return (
    <Dropdown overlay={<UserMenu />} className="UserDropdown">
      <div className="text-link">
        <UserOutlined /> {currentUser.firstName} <DownOutlined />
      </div>
    </Dropdown>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserDropdown);
