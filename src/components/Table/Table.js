import React from 'react';
import { Table as AntTable } from 'antd';

function Table({ ...defaultProps }) {
  return (
    <AntTable
      {...defaultProps}
    />
  );
}

export default Table;
