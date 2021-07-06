import React from 'react';
import { Empty as AntEmpty } from 'antd';

import './Empty.scss';

function Empty({ ...defaultProps }) {
  return (
    <AntEmpty
      {...defaultProps}
    />
  );
}

export default Empty;
