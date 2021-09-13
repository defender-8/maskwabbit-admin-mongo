import React from 'react';
import AntTooltip from 'antd/es/tooltip/'

import './index.less';

export default function Tooltip({children, ...props}) {
  return (
    <AntTooltip
      color="#fff"
      {...props}
    >
      {children}
    </AntTooltip>
  );
}
