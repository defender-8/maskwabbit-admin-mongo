import React, { useState } from 'react';
import { Modal as AntModal } from 'antd';

import './index.less';

function Modal({ modalBtn, modalContent, modalCustomFooter, modalProps }) {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  return (
    <>
      {modalBtn(showModal)}
      <AntModal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        {...modalProps}
      >
        {modalContent(handleOk)}
        {modalCustomFooter ? modalCustomFooter(handleCancel) : null}
      </AntModal>
    </>
  );
}

export default Modal;
