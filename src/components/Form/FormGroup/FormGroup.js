import React from 'react';
import PropTypes from 'prop-types';

import './FormGroup.scss';

FormGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

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
