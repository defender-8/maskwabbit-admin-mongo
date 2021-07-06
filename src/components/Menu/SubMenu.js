import React from 'react';
import { Menu } from 'antd';

function SubMenu({ ...defaultProps }) {
  return (
    <Menu.SubMenu
      {...defaultProps}
    />
  );
}

export default SubMenu;
