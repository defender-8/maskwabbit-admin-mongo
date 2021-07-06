import React from 'react';
import { Pagination as AntPagination } from 'antd';

function Pagination({ ...defaultProps }) {
  return (
    <AntPagination
      {...defaultProps}
    />
  );
}

export default Pagination;
