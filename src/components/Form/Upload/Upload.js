import React from 'react';
import { Upload as AntUpload } from 'antd';

function Upload({ ...defaultProps }) {
  return (
    <AntUpload
      {...defaultProps}
    />
  );
}

export default Upload;
