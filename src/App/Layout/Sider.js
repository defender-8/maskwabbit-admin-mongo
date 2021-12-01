import React from "react";
import { DashboardOutlined } from "@ant-design/icons";

import { Layout } from "../../base/components";
import MainNav from "../MainNav";

function Sider({ collapsed }) {
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="sider-title">
        <DashboardOutlined
          style={{
            color: "#fff",
            fontSize: "32px",
          }}
        />
      </div>
      <MainNav />
    </Layout.Sider>
  );
}

export default Sider;
