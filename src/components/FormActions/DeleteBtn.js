import React from "react";
import { Button, Popconfirm } from "../../base/components";

function DeleteBtn({ deleteItem, removing }) {
  const cancelDelete = (e) => {
    console.log(e);
  };

  return (
    <Popconfirm
      title="Are you sure to delete this item?"
      onConfirm={deleteItem}
      onCancel={cancelDelete}
      okText="Yes"
      cancelText="Cancel"
    >
      <Button type="danger" danger loading={removing} className="ml-2">
        Delete
      </Button>
    </Popconfirm>
  );
}

export default DeleteBtn;
