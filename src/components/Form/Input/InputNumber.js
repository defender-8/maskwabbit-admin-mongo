import React from 'react';
import { InputNumber as AntInputNumber } from 'antd';

function InputNumber({ ...defaultProps }) {
  return (
    <AntInputNumber
      {...defaultProps}
    />
  );
}

export default InputNumber;
