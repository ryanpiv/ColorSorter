import React, { useRef } from 'react';
import Modal from 'react-modal';
import { replaceURLState } from '../Utils/URL';
import { hexOrRgbMatch, sassVarMatch } from '../Utils/Colors';
import ModalSettingsCopyType from './ModalSettingsCopyType';
import ModalSettingsDisplayType from './ModalSettingsDisplayType';

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

    regExArr.forEach((value, i) => {
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

    colorsArr.forEach((value, i) => {
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

          <h3 className="c-heading c-heading--h2">Color Type to Copy to Clipboard and Download As</h3>
          <ModalSettingsCopyType
            session={session}
            disabled={true}
            displayName="Hex"
            defaultChecked={session.settings.copy.hex.checked}
            handleClick={() => {
              setSession({
                ...session,
                settings: {
                  ...settings,
                  hex: { checked: !settings.copy.hex.checked }
                }
              })
            }}
          />

          <ModalSettingsCopyType
            session={session}
            disabled={true}
            displayName="RGB"
            defaultChecked={session.settings.copy.rgb.checked}
            handleClick={() => {
              setSession({
                ...session,
                settings: {
                  ...settings,
                  rgb: { checked: !settings.copy.rgb.checked }
                }
              })
            }}
          />

          <ModalSettingsCopyType
            session={session}
            disabled={true}
            displayName="HSL"
            defaultChecked={session.settings.copy.hsl.checked}
            handleClick={() => {
              setSession({
                ...session,
                settings: {
                  ...settings,
                  hsl: { checked: !settings.copy.hsl.checked }
                }
              })
            }}
          />

          <h3 className="c-heading c-heading--h2">Color Format to Display in Grid Cells</h3>
          <ModalSettingsDisplayType
            session={session}
            disabled={false}
            displayName="Hex"
            defaultChecked={session.settings.display.hex.checked}
            handleClick={() => {
              setSession({
                ...session,
                settings: {
                  ...session.settings,
                  display: {
                    ...session.settings.display,
                    hex: { checked: !settings.display.hex.checked }
                  }
                }
              })
            }}
          />

          <ModalSettingsDisplayType
            session={session}
            disabled={false}
            displayName="RGB"
            defaultChecked={session.settings.display.rgb.checked}
            handleClick={() => {
              setSession({
                ...session,
                settings: {
                  ...session.settings,
                  display: {
                    ...session.settings.display,
                    rgb: { checked: !settings.display.rgb.checked }
                  }
                }
              })
            }}
          />

          <ModalSettingsDisplayType
            session={session}
            disabled={false}
            displayName="HSL"
            defaultChecked={session.settings.display.hsl.checked}
            handleClick={() => {
              setSession({
                ...session,
                settings: {
                  ...session.settings,
                  display: {
                    ...session.settings.display,
                    hsl: { checked: !settings.display.hsl.checked }
                  }
                }
              })
            }}
          />


          <h3 className="c-heading c-heading--h2">Generate Colors from Sass Vars</h3>
          <div className="c-modal-settings__generate">
            <h3 className="c-heading c-heading--h3">
              Sass color variables:
            </h3>
            <p className="c-subheading">
              $color-light-black: #262f2f;<br />
              {/* $color-gray: rgba(235, 239, 242, 0.5);<br /> */}
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
