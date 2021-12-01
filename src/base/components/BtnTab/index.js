import React from "react";
import classNames from "classnames";

import "./index.less";

export default function BtnTab({ children, active, onClick }) {
  return (
    <div className={classNames("BtnTab", { active })} onClick={onClick}>
      {children}
    </div>
  );
}
