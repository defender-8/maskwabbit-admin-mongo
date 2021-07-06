import React from 'react';
import { Input } from 'antd';

function TextArea({ ...defaultProps }) {
  return (
    <Input.TextArea
      {...defaultProps}
    />
  );
}

export default TextArea;
