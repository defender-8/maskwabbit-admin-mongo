import React from 'react';
import { Spin as AntSpin } from 'antd';

function Spin({ ...defaultProps }) {
  return (
    <div className="posCenter">
      <AntSpin
        {...defaultProps}
      />
    </div>
  );
}

export default Spin;
