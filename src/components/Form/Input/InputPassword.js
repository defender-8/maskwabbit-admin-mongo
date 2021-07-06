import React from 'react';
import { Input } from 'antd';

function InputPassword({ ...defaultProps }) {
  return (
    <Input.Password
      {...defaultProps}
    />
  );
}

export default InputPassword;
