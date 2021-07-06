import React from 'react';
import { Menu } from 'antd';

function MenuItem({ ...defaultProps }) {
  return (
    <Menu.Item
      {...defaultProps}
    />
  );
}

export default MenuItem;
