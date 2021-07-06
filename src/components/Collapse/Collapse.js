import React from 'react';
import { Collapse as AntCollapse } from 'antd';

import './Collapse.scss';

function Collapse({ ...defaultProps }) {
  return (
    <AntCollapse
      {...defaultProps}
    />
  );
}

export default Collapse;
