import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useGoBack } from "../../hooks";

import { Button } from "../index";

function GoBackButton({ className }) {
  const { goBack } = useGoBack();

  return (
    <Button type="primary" icon={<ArrowLeftOutlined />} className={className} onClick={goBack}>
      Back
    </Button>
  );
}

export default GoBackButton;
