import React from "react";

import Select from "./index";

const { Option } = Select;

function SelectValues({ values, onChange, value }) {
  return (
    <Select onChange={onChange} value={value}>
      {values.map((v) => (
        <Option key={v} value={v}>
          {v}
        </Option>
      ))}
    </Select>
  );
}

export default SelectValues;
