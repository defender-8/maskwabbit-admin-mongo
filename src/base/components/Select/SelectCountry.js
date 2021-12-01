import React from "react";

import SelectWithSearch from "./SelectWithSearch";

import { countriesArr } from "../../data";

function SelectCountry({ onChange, value }) {
  return (
    <SelectWithSearch
      onChange={onChange}
      value={value}
      dataArr={countriesArr}
    />
  );
}

export default SelectCountry;
