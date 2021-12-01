import React from "react";
import classNames from "classnames";

import "./index.less";

export default function Badge({ count, className }) {
  return (
    <div className={classNames("Badge", { [`${className}`]: className })}>
      {count}
    </div>
  );
}
