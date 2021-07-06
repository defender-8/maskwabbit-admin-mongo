import React from 'react';
import { List } from 'antd';

function ListItem({ ...defaultProps }) {
  return (
    <List.Item
      {...defaultProps}
    />
  );
}

export default ListItem;
