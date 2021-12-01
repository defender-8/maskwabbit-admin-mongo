import React from "react";
import { useSelector } from "react-redux";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { Dropdown } from "../../../../base/components";
import UserMenu from "./UserMenu";

import "./index.less";

function UserDropdown() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Dropdown overlay={<UserMenu />} className="UserDropdown">
      <div className="text-link">
        <UserOutlined /> {user.firstName} <DownOutlined />
      </div>
    </Dropdown>
  );
}

export default UserDropdown;
