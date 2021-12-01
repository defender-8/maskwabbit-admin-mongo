import React from "react";

import { CloseIcon } from "../../../../assets/images/icons";
import "./index.less";

export default function BtnClose() {
  return (
    <div className="BtnClose">
      <CloseIcon className="BtnClose-icon" />
    </div>
  );
}
