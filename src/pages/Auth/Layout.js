import React from "react";

import "./Layout.less";

function Layout({ children }) {
  return (
    <div className="AuthLayout">
      <div className="AuthLayout-inner">{children}</div>
    </div>
  );
}

export default Layout;
