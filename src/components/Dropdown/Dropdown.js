import React from 'react';
import { Dropdown as AntDropdown } from 'antd';

import './Dropdown.scss';

function Dropdown({ ...defaultProps }) {
  return (
    <AntDropdown
      {...defaultProps}
    />
  );
}

export default Dropdown;
