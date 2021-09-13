import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import './index.less';

export default function Spin({size = 32, isText}) {
  return (
    <div className="Spin">
      <LoadingOutlined style={{ fontSize: size }} />
      {
        isText ?
          <div className="Spin-text">Uploading...</div> : null
      }
    </div>
  );
}
