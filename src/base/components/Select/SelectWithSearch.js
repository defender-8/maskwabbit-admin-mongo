import React from 'react';

import Select from './index';

const { Option } = Select;

const filterOption = (input, option) =>
  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

export default function SelectWithSearch({ dataArr, defaultValue, onChange, value }) {
  return (
    <Select
      defaultValue={defaultValue}
      showSearch
      optionFilterProp="children"
      filterOption={filterOption}
      onChange={onChange}
      value={value}
    >
      {
        dataArr.map(item =>
          <Option key={item} value={item}>{item}</Option>,
        )
      }
    </Select>
  );
}
