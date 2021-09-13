import React from 'react';
import AntTimePicker from 'antd/es/time-picker';

function TimePicker({...props}) {
  return (
    <AntTimePicker
      allowClear={false}
      format="hh:mm A"
      minuteStep={5}
      {...props}
    />
  );
}

export default TimePicker;
