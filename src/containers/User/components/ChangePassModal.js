import React from 'react';

import Modal from '../../../components/Modal/Modal';
import ChangePassForm from './ChangePassForm';

function ChangePassModal({ setFormFieldsValue, onFinishMessage, user }) {
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
      setFormFieldsValue={setFormFieldsValue}
      onFinishMessage={onFinishMessage}
      user={user}
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
