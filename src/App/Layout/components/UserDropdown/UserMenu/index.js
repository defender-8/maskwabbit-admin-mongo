import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { logOut } from '../../../../../redux/auth/actions';

import { Menu } from '../../../../../base/components';

import './index.less';


function UserMenu() {
  const { url } = useRouteMatch();

  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const profileLink = (user.role === 'super admin') ?
    `/super-admins/${user._id}` : `/admins/${user._id}`;

  const signOut = () => dispatch(logOut());

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

export default UserMenu;
