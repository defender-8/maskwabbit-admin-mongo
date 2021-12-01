import React from "react";

import AntRadioGroup from "./AntRadioGroup";
import Radio from "./index";

export default function RadioGender({ onChange, value }) {
  return (
    <AntRadioGroup onChange={onChange} value={value}>
      <Radio value="m">Male</Radio>
      <Radio value="f">Female</Radio>
    </AntRadioGroup>
  );
}
