import React from "react";

import SelectWithSearch from "./SelectWithSearch";

import { nationalitiesArr } from "../../data";

function SelectNationality({ onChange, value }) {
  return (
    <SelectWithSearch
      onChange={onChange}
      value={value}
      dataArr={nationalitiesArr}
    />
  );
}

export default SelectNationality;
