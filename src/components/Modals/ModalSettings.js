import React, { useRef } from 'react';
import Modal from 'react-modal';
import { replaceURLState } from '../Utils/URL';
import { hexOrRgbMatch, sassVarMatch } from '../Utils/Colors';

Modal.setAppElement('#root');

export const ModalSettings = ({ ...props }) => {
  const { isSettingsModalOpen, setIsSettingsModalOpen, session, setSession, setUrlParams } = props;
  const { settings } = session;
  const colorsTextArea = useRef();

  const toggleModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  }

  const handleGenerateClick = () => {
    const text = colorsTextArea.current.value.replace(/[\n\r]+/g, '').replace(/\s+/g, '').trim();
    const regExArr = [
      /\$(.+?):(.+?);/g, // sassVarAndValueRegex
      // /\#\w{1,8}[;,]/g, // hexCommaRegex
      // /&\w+[=]\w+/g, // queryStringRegex
    ];

    /*
      1. Loop through regex array, most general to most specific order of regex querying
      2. attempt to match the current type of regex
      3. if values are found, massage the array for the type of regex
    */

    regExArr.map((value, i) => {
      const matchedArr = text.match(value);
      if (matchedArr.length > 0) {
        switch (i) {
          case 0:
            // sassVarAndValueRegex
            seperateKeysFromValues(matchedArr);
            break;
          case 1:
            // hexCommaRegex
            break;
          case 2:
            // queryStringRegex
            break;
          default:
            break;
        }
      }
    });
  }

  const seperateKeysFromValues = (colorsArr) => {
    const params = new URLSearchParams();

    colorsArr.map((value, i) => {
      let color = hexOrRgbMatch(value);
      let name = sassVarMatch(value);
      params.set(name, color);
    });

    setUrlParams(params);
    replaceURLState(params);
    setIsSettingsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isSettingsModalOpen}
      // onAfterOpen={afterOpenModal}s
      // onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'transparent',
        }
      }}
      contentLabel="Example Modal"
      className="c-modal c-modal-settings"
    >
      <div className="c-modal__overlay">
        <button className="c-modal__close-button" onClick={toggleModal}>close</button>
        <div className="c-modal__content-container">
          <h2 className="c-heading c-heading--h1">Settings</h2>

          <h3 className="c-heading c-heading--h2">Color Type to Copy</h3>
          <div className="c-modal-settings__settings-group">
            <label className="c-modal-settings__label" htmlFor="c-modal-settings__check-hex">Hex</label>
            <input type="checkbox"
              id="c-modal-settings__check"
              name="c-modal-settings__check"
              className="c-modal-settings__check"
              value="hex"
              defaultChecked={session.settings.hex.checked}
              onClick={() => {
                setSession({
                  ...session,
                  settings: {
                    ...settings,
                    hex: { checked: !settings.hex.checked }
                  }
                })
              }} />
          </div>

          <div className="c-modal-settings__settings-group">
            <label className="c-modal-settings__label" htmlFor="c-modal-settings__check-rgb">RGB</label>
            <input type="checkbox"
              id="c-modal-settings__check"
              name="c-modal-settings__check"
              className="c-modal-settings__check"
              value="hex"
              defaultChecked={session.settings.rgb.checked}
              onClick={() => {
                setSession({
                  ...session,
                  settings: {
                    ...settings,
                    rgb: { checked: !settings.rgb.checked }
                  }
                })
              }} />
          </div>

          <h3 className="c-heading c-heading--h2">Generate Your Colors</h3>
          <div className="c-modal-settings__generate">
            <h3 className="c-heading c-heading--h3">
              Sass color variables:
            </h3>
            <p className="c-subheading">
              $color-light-black: #262f2f;<br />
              $color-gray: rgba(235, 239, 242, 0.5);<br />
              $color-pure-gray: #969da0;<br />
              $color-light-gray: #e0e7eb;<br />
            </p>

            {/* <h3 className="c-heading c-heading--h3">
              Query strings:
            </h3>
            <p className="c-subheading">
              turquoise=1abc9c&emerald=2ecc71&carrot=e67e22&alizarin=e74c3c&amethyst=9b59b6&
            </p>

            <h3 className="c-heading c-heading--h3">Comma seperated</h3>
            <p className="c-subheading">
              turquoise=1abc9c,<br />
              emerald=2ecc71,<br />
              carrot=#e67e22,<br />
              alizarin=#e74c3c,<br />
              amethyst=9b59b6
            </p> */}

            <textarea className="c-modal-settings__generate-text-area"
              placeholder="Paste colors:"
              ref={colorsTextArea}
            ></textarea>
            <button className="c-button c-modal-settings__generate-button"
              onClick={handleGenerateClick}
            >Generate</button>
          </div>
        </div>
      </div>
    </Modal >
  );
}

export default ModalSettings;
