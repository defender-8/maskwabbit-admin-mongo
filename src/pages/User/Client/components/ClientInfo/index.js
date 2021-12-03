import React from "react";
import { UserOutlined } from "@ant-design/icons";

import { Avatar } from "../../../../../base/components";

import './index.less';
import moment from "moment";

function ClientInfo({ firstName, lastName, createdAt }) {
  return (
    <div className="ClientInfo">
      <div className="ClientInfo-avatar">
        <Avatar size={120} icon={<UserOutlined />} />
      </div>
      <div className="ClientInfo-data">
        <div className="ClientInfo-data-item">
          <span className="mr-05">First Name:</span>
          <span>{firstName}</span>
        </div>
        <div className="ClientInfo-data-item">
          <span className="mr-05">Last Name:</span>
          <span>{lastName}</span>
        </div>
        <div className="ClientInfo-data-item">
          <span className="mr-05">Created at:</span>
          <span>{moment(createdAt).format("MM/DD/YYYY")}</span>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
