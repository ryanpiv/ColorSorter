import React, { useRef } from 'react';
import Modal from 'react-modal';
import ModalSettingsCopyType from './ModalSettingsCopyType';
import ModalSettingsDisplayType from './ModalSettingsDisplayType';
import { colorRegEx } from '../ColorCell/ColorRegEx';
import { constructColor } from '../ColorCell/ColorSort';

Modal.setAppElement('#root');

export const ModalSettings = ({ ...props }) => {
  const { isSettingsModalOpen, setIsSettingsModalOpen, session, setSession, setColorsArray } = props;
  const { settings } = session;
  const colorsTextArea = useRef();

  const toggleModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  }

  const handleGenerateClick = () => {
    // Get text from field, trim space, split based on semicolon
    const text = colorsTextArea.current.value.trim().split(/[\n;]+/g);
    let colorsArr = [];

    text.forEach(colorValue => {
      // Remove white space from string, match name based on : otherwise set name to the color
      let color = colorValue.replace(/[\n\r]+/g, '').replace(/\s+/g, '');
      let name = color.match(/(.+?)(?=:)/g) ? color.match(/(.+?)(?=:)/)[0] : color.replace('#', '');

      // Loop through regex and attempt to match each color type
      // Create color object when a match is found
      for (const regExValue of colorRegEx) {
        const matched = color.match(regExValue);
        if (matched && matched.length > 0) {
          colorsArr.push(
            constructColor({ name, color: matched[0] })
          );
          break;
        }
      }
    })

    if (colorsArr.length > 0) {
      setColorsArray(colorsArr);
      setIsSettingsModalOpen(false);
    }
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

          <h3 className="c-heading c-heading--h2">Generate Colors</h3>
          <div className="c-modal-settings__generate">
            <ul>
              <li>Must end each line with a semi-colon!</li>
              <li>Names are not required</li>
              <li>Create a color name with an equals sign, such as colorName=#fff</li>
            </ul>
            <h3 className="c-heading c-heading--h3">Accepted formats: </h3>
            <h3 className="c-heading c-heading--h3">Sass color variables:</h3>
            <p className="c-subheading">
              $color-light-black: #262f2f;<br />
              $color-gray: rgba(235, 239, 242, 0.5);<br />
            </p>
            <h3 className="c-heading c-heading--h3">Name Value Pairing</h3>
            <p className="c-subheading">
              emerald=2ecc71;<br />
              carrot=#e67e22;<br />
            </p>
            <h3 className="c-heading c-heading--h3">Any Valid Hex of 3, 6 or 8 digits</h3>
            <p className="c-subheading">
              hex=000;<br />
              hexColorName=#1e1e1e;<br />
              #00ff0088;<br />
              #fff;<br />
              fff;<br />
            </p>
            <h3 className="c-heading c-heading--h3">HSL, RGB, RGBA</h3>
            <p className="c-subheading">
              hslColor=hsl(195, 100 %, 50 %);<br />
              rgb(0, 191, 255);<br />
            </p>

            {/* <h3 className="c-heading c-heading--h3">
              Query strings:
            </h3>
            <p className="c-subheading">
              turquoise=1abc9c&emerald=2ecc71&carrot=e67e22&alizarin=e74c3c&amethyst=9b59b6&
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
