import React from 'react';
import ReactGoogleButton from 'react-google-button';

import classNames from 'classnames';

function GoogleButton({ block, ...defaultProps }) {
  return (
    <ReactGoogleButton
      className={classNames('GoogleButton', { 'w-100': block })}
      {...defaultProps}
    />
  );
}

export default GoogleButton;
