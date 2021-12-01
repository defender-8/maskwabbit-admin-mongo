import React from "react";
import classNames from "classnames";

import "./index.less";

function Hr({ className }) {
  return <hr className={classNames("Hr", { [`${className}`]: className })} />;
}

export default Hr;
