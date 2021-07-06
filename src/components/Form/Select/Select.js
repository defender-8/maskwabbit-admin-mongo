import React from 'react';
import { Select as AntSelect } from 'antd';

import './Select.scss';

function Select({ ...defaultProps }) {
  return (
    <AntSelect
      {...defaultProps}
    />
  );
}

export default Select;
