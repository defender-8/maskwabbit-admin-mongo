import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { Layout, Row, Col } from "../../base/components";
import UserDropdown from "./components/UserDropdown";

function Header({ siderCollapsed, toggleSider, title }) {
  return (
    <Layout.Header>
      <Row>
        <Col flex="32px">
          {React.createElement(
            siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleSider,
            }
          )}
        </Col>
        <Col flex="auto">
          <h1>{title}</h1>
        </Col>
        <Col flex="160px">
          <UserDropdown />
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default Header;
