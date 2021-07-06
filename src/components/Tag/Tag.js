import React from 'react';
import { Tag as AntTag } from 'antd';

import './Tag.scss';

function Tag({ ...defaultProps }) {
  return (
    <AntTag
      {...defaultProps}
    />
  );
}

export default Tag;
