import React from 'react';
import { Select } from 'antd';

function Option({ ...defaultProps }) {
  return (
    <Select.Option
      {...defaultProps}
    />
  );
}

export default Option;
