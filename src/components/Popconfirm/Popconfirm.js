import React from 'react';
import { Popconfirm as AntPopconfirm } from 'antd';

import './Popconfirm.scss';

function Popconfirm({ ...defaultProps }) {
  return (
    <AntPopconfirm
      {...defaultProps}
    />
  );
}

export default Popconfirm;
