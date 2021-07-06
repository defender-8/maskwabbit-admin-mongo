import React from 'react';
import { Collapse } from 'antd';

function Panel({ ...defaultProps }) {
  return (
    <Collapse.Panel
      {...defaultProps}
    />
  );
}

export default Panel;
