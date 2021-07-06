import React from 'react';
import { Alert as AntAlert } from 'antd';

function Alert({ ...defaultProps }) {
  return (
    <AntAlert
      {...defaultProps}
    />
  );
}

export default Alert;
