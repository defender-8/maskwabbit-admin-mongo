import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { get } from '../../../redux/category/actions';

import { Select } from '../../../base/components';

const { Option } = Select;

function SelectCategory({ onChange, value }) {
  const { user: { token } } = useSelector(state => state.auth);
  const { dataArray } = useSelector(state => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(get(token));
  }, []);

  return (
    <Select mode="multiple" value={value} onChange={onChange}>
      {
        dataArray.map(c => <Option key={c._id} value={c._id}>{c.title}</Option>)
      }
    </Select>
  );
}

export default SelectCategory;
