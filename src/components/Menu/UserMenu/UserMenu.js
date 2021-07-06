import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
} from '../../../redux/auth/auth-selectors';
import { logOut } from '../../../redux/auth/auth-actions';

import Menu from '../Menu';
import MenuItem from '../MenuItem';

import './UserMenu.scss';

function UserMenu({ currentUser, logOut, match }) {
  const profileLink = (currentUser.role === 'super admin') ?
    `/super-admins/${currentUser._id}` : `/admins/${currentUser._id}`;

  return (
    <Menu className="UserMenu" selectedKeys={[match.url]}>
      <MenuItem>
        <ProfileOutlined />
        <Link
          to={profileLink}
          className="d-inline-block"
        >
          Profile
        </Link>
      </MenuItem>
      <MenuItem className="color-danger" onClick={logOut}>
        <LogoutOutlined />
        Logout
      </MenuItem>
    </Menu>
  );
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMenu));
