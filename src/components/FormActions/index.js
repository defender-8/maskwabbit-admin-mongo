import React from "react";
import classNames from "classnames";

import { Button, GoBackButton, Row, Col } from "../../base/components";
import DeleteBtn from "./DeleteBtn";

import "./index.less";

function FormActions({ posAbsolute, deleteItem, isItemNew, saving, removing }) {
  return (
    <div
      className={classNames("FormActions", {
        "FormActions-p-abs": posAbsolute,
      })}
    >
      <Row justify="space-between">
        <Col flex="100px">
          <GoBackButton />
        </Col>
        <Col flex="260px" className="text-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
            className="btn-success"
          >
            Save
          </Button>
          {!isItemNew ? (
            <DeleteBtn removing={removing} deleteItem={deleteItem} />
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default FormActions;
