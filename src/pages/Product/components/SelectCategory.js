import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getArr } from '../../../redux/category/category-actions';

import { Select } from '../../../base/components';

const { Option } = Select;

function SelectCategory({ onChange, value }) {
  const { user } = useSelector(state => state.auth);
  const { categories } = useSelector(state => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getArr(`/dashboard/categories`, user.token));
  }, []);

  return (
    <Select mode="multiple" value={value} onChange={onChange}>
      {
        categories.map(c => <Option key={c._id} value={c._id}>{c.title}</Option>)
      }
    </Select>
  );
}

export default SelectCategory;
