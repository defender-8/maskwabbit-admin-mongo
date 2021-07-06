import React from 'react';
import { Button as AntButton } from 'antd';

import './Button.scss';

function Button({ children, ...defaultProps }) {
  return (
    <AntButton
      {...defaultProps}
    >
      {children}
    </AntButton>
  );
}

export default Button;
