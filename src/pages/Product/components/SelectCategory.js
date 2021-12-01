import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { get } from "../../../redux/modules/category";

import { Select } from "../../../base/components";

const { Option } = Select;

function SelectCategory({ onChange, value }) {
  const {
    user: { token },
  } = useSelector((state) => state.auth);
  const { dataArr } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get(token));
  }, []);

  return (
    <Select mode="multiple" value={value} onChange={onChange}>
      {dataArr?.map((c) => (
        <Option key={c._id} value={c._id}>
          {c.title}
        </Option>
      ))}
    </Select>
  );
}

export default SelectCategory;
