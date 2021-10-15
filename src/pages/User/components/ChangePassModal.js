import React from 'react';

import { Modal } from '../../../base/components';
import ChangePassForm from './ChangePassForm';

function ChangePassModal({ userId }) {
  const currentModalProps = {
    width: 480,
    title: 'Change Password',
    footer: null,
  };

  const modalBtn = (showModal) =>
    <div className="text-link" onClick={showModal}>Change
      Password
    </div>;

  const modalContent = (handleOk) =>
    <ChangePassForm
      userId={userId}
      handleOk={handleOk}
    />;

  return (
    <Modal
      modalBtn={modalBtn}
      modalContent={modalContent}
      modalProps={currentModalProps}
    />
  );
}

export default ChangePassModal;
