import React from 'react';

import './Auth.scss';

function Auth({ children }) {
  return (
    <div className="Auth">
      <div className="Auth-inner">
        {children}
      </div>
    </div>
  );
}

export default Auth;
