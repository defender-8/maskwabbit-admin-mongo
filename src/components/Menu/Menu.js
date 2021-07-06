import React from 'react';
import { Menu as AntMenu } from 'antd';

import './Menu.scss';

function Menu({ ...defaultProps }) {
  return (
    <AntMenu
      {...defaultProps}
    />
  );
}

export default Menu;
