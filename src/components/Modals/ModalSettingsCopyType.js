import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const ModalSettingsCopyType = ({ ...props }) => {
  const { disabled, handleClick, displayName, defaultChecked } = props;

  return (
    <React.Fragment>
      <div className="c-modal-settings__settings-group">
        <label className="c-modal-settings__label" htmlFor={`c-modal-settings__check-copy-${displayName}`}>{displayName}</label>
        <input type="checkbox"
          id={`c-modal-settings__copy-check-${displayName}`}
          name={`c-modal-settings__copy-check-${displayName}`}
          className="c-modal-settings__check"
          value="rgb"
          disabled={disabled}
          defaultChecked={defaultChecked}
          onClick={handleClick} />
      </div>
    </React.Fragment>
  );
}

export default ModalSettingsCopyType;
