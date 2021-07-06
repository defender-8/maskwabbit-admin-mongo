import React from 'react';
import { List as AntList } from 'antd';

function List({ ...defaultProps }) {
  return (
    <AntList
      {...defaultProps}
    />
  );
}

export default List;
