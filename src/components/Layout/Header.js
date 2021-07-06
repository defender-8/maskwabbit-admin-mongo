import React from 'react';
import { Layout, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

import UserDropdown from './components/UserDropdown';

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

function Header({ collapsed, toggle, children, title }) {
  return (
    <Layout className="site-layout">
      <Layout.Header>
        <Row>
          <Col flex="32px">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Col>
          <Col flex="auto">
            <h1>{title}</h1>
          </Col>
          <Col flex="160px">
            <UserDropdown />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content>
        <div className="container">
          {children}
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default Header;
