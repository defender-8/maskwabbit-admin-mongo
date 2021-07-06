import React from 'react';
import { Form } from 'antd';

function FormItem({ ...defaultProps }) {
  return (
    <Form.Item
      {...defaultProps}
    />
  );
}

export default FormItem;
