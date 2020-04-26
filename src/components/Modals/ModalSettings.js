import React, { useState } from 'react';
import Modal from 'react-modal';

export const ModalSettings = ({ ...props }) => {
  const { isSettingsModalOpen, setIsSettingsModalOpen } = props;
  Modal.setAppElement('#root');

  const toggleModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={isSettingsModalOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="c-modal"
      >
        <button onClick={toggleModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default ModalSettings;
