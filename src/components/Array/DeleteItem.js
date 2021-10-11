import React, { useCallback, useState } from 'react';
import {
  DeleteFilled,
} from '@ant-design/icons';

import { stopPropagation } from '../../base/utils/event';

import { Popconfirm } from '../../base/components';

function DeleteItem({ onDelete, record, loading }) {

  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const confirm = useCallback(async (e) => {
    await onDelete(record);
    hide();
  }, [onDelete, record, hide]);

  return (
    <div onClick={stopPropagation} className="d-inline-block">
      <Popconfirm
        visible={visible}
        title="Are you sure to delete this item?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="Cancel"
        okButtonProps={{loading}}
        onCancel={hide}
      >
        <DeleteFilled onClick={show} />
      </Popconfirm>
    </div>
  );
}

export default DeleteItem;
