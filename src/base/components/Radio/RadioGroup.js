import React from 'react';

import AntRadioGroup from './AntRadioGroup';
import Radio from './index';

function RadioGroup({values, onChange, value }) {
  return (
    <AntRadioGroup onChange={onChange} value={value}>
      {
        values.map(v => <Radio key={v} value={v}>{v}</Radio>)
      }
    </AntRadioGroup>
  );
}

export default RadioGroup;
