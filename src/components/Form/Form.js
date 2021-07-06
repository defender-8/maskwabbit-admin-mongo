import React from 'react';
import { Form as AntForm } from 'antd';

function Form({ ...defaultProps }) {
  return (
    <AntForm
      {...defaultProps}
    />
  );
}

export default Form;
