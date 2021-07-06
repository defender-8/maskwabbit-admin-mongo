import React from 'react';
import { Input as AntInput } from 'antd';

import './Input.scss';

function Input({ ...defaultProps }) {
  return (
    <AntInput
      {...defaultProps}
    />
  );
}

export default Input;
