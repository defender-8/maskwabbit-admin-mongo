import React from 'react';

import './index.less';

function FormGroup({ children, title, subTitle }) {
  return (
    <div className="FormGroup">
      {
        title ?
          <div className="FormGroup-title">
            {title}
          </div> : null
      }
      {
        subTitle ?
          <div className="FormGroup-sub-title">
            {subTitle}
          </div> : null
      }
      {children}
    </div>
  );
}

export default FormGroup;
