import React from 'react';
import { Layout } from 'antd';
import {
  DashboardOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import MainNav from '../Menu/MainMenu/MainMenu';

Sider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

function Sider({ collapsed }) {
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="sider-title">
        <DashboardOutlined
          style={
            {
              color: '#fff',
              fontSize: '32px',
            }
          }
        />
      </div>
      <MainNav />
    </Layout.Sider>
  );
}

export default Sider;
