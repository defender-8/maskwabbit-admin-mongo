import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useGoBack } from "../../hooks";

import { Button } from "../index";

function GoBackButton() {
  const { goBack } = useGoBack();

  return (
    <Button type="primary" icon={<ArrowLeftOutlined />} onClick={goBack}>
      Back
    </Button>
  );
}

export default GoBackButton;
