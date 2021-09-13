import React, { useState, useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  TableOutlined,
  BarsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { Menu } from '../../base/components';

import './index.less';

// submenu keys of first level
const rootSubmenuKeys = ['subUsers'];

function MainNav() {
  const user = useSelector(state => state.auth.user);

  const { url } = useRouteMatch();
  const [openKeys, setOpenKeys] = useState(['subUsers']);

  const onOpenChange = useCallback( keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }, [openKeys, setOpenKeys]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[url]}
      className="MainNav"
    >
      <Menu.Item key="/products" icon={<TableOutlined />}>
        <Link to="/products">
          Products
        </Link>
      </Menu.Item>
      <Menu.Item key="/categories" icon={<BarsOutlined />}>
        <Link to="/categories">
          Categories
        </Link>
      </Menu.Item>
      <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
        <Link to="/orders">
          Orders
        </Link>
      </Menu.Item>
      <Menu.SubMenu key="subUsers" icon={<UserOutlined />} title="Users">
        {
          (user.role === 'super admin') ?
            <>
              <Menu.Item key="/super-admins">
                <Link to="/super-admins">
                  Super Admins
                </Link>
              </Menu.Item>
              <Menu.Item key="/admins">
                <Link to="/admins">
                  Admins
                </Link>
              </Menu.Item>
            </> : null
        }
        <Menu.Item key="/clients">
          <Link to="/clients">
            Clients
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

export default MainNav;
