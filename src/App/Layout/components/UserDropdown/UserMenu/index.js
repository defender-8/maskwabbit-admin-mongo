import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectUser,
} from '../../../../../redux/auth/auth-selectors';
import { logOut } from '../../../../../redux/auth/auth-actions';

import { Menu } from '../../../../../base/components';

import './index.less';

function UserMenu({ user, signOut }) {
  const { url } = useRouteMatch();

  const profileLink = (user.role === 'super admin') ?
    `/super-admins/${user.id}` : `/admins/${user.id}`;

  return (
    <Menu className="UserMenu" selectedKeys={[url]}>
      <Menu.Item>
        <ProfileOutlined />
        <Link
          to={profileLink}
          className="d-inline-block"
        >
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item className="color-danger" onClick={signOut}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
