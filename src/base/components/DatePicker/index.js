import React from "react";
import AntDatePicker from "antd/es/date-picker";
import "./index.less";

function DatePicker({ ...props }) {
  return <AntDatePicker allowClear={false} format="MM/DD/YYYY" {...props} />;
}

export default DatePicker;
