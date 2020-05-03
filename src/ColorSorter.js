import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import ColorCell from './components/ColorCell/ColorCell';
import ModalSettings from './components/Modals/ModalSettings'
import { sortColors } from './components/ColorCell/ColorSort';
import { fallbackCopyTextToClipboard } from './components/Utils/Utils';
import { replaceURLState } from './components/Utils/URL';

export const ColorSorter = ({ ...props }) => {
  const previousSession = props || {};
  const [urlParams, setUrlParams] = useState(new URLSearchParams(window.location.search) || []);
  const [colorsArray, setColorsArray] = useState(previousSession.colors || []);
  const [formattedColors, setFormattedColors] = useState([]);
  const [clipboardColor, setClipboardColor] = useState();
  const [colorsHistory, setColorsHistory] = useState([]);
  const [session, setSession] = useState(previousSession);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCopyActive, setIsCopyActive] = useState(false);
  const isCopyActiveClass = isCopyActive === true ? ' is-shown' : '';

  /*
    Change to ColorsArray:
      formatColors()
      setFormattedColors( [...formattedColors ])
  */
  useEffect(() => {
    if (colorsArray.length > 0) {
      const temp = [...colorsArray];
      sortColors(temp);
      setFormattedColors(temp);
    }
  }, [colorsArray]);

  /*
    Change to formattedColors:
      abstract key value pairs
      setUrlParams(params)
      setSession(...session, session.colors)
  */
  useEffect(() => {
    const params = new URLSearchParams();
    formattedColors.forEach(value => {
      const { color, name } = value;
      params.set(name, color);
    });

    setSession({
      ...session,
      colors: formattedColors
    });
    setUrlParams(params);
  }, [formattedColors]);

  useEffect(() => {
    replaceURLState(urlParams);
  }, [urlParams]);

  useEffect(() => {
    localStorage.setItem('color-sorter', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (clipboardColor) {
      copyText(clipboardColor.hex);
    }
  }, [clipboardColor]); //eslint-disable-line react-hooks/exhaustive-deps

  const animateCopiedText = () => {
    setIsCopyActive(true);
    setTimeout(() => {
      setIsCopyActive(false);
    }, 1400);
  };

  const copyText = (text) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
    }
    navigator.clipboard.writeText(text).then(function () {
    }, function (err) {
      alert('Async: Could not copy text: ', err);
      return
    });
    // debugger;
    let temp = [...colorsHistory];
    temp.push(clipboardColor);
    setColorsHistory(temp);
    animateCopiedText();
  };

  return (
    <main className={`c-color-sorter${isSettingsModalOpen ? ' is-blurred' : ''}`}>
      <ModalSettings
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        session={session}
        setColorsArray={setColorsArray}
        setSession={setSession}
        setUrlParams={setUrlParams}
      />
      <div className={`c-color-copy${isCopyActiveClass} l-flex l-absolute-center`}
        style={{
          backgroundColor: clipboardColor && `${clipboardColor.hex}`,
        }} >
        <span className="c-color-copy__value-container l-flex l-absolute-center">
          <p className="c-color-copy__value">Copied: #{clipboardColor && clipboardColor.hex}</p>
        </span>
      </div>
      <Nav colorsHistory={colorsHistory}
        setClipboardColor={setClipboardColor}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        session={session} />
      <ul className="c-color-grid">
        {formattedColors && formattedColors.map((color, i) => {
          return <ColorCell
            color={color}
            setClipboardColor={setClipboardColor}
            session={session}
            key={i} />
        })}
        {formattedColors.length === 0 &&
          <ColorCell
            color={{
              name: 'Try loading some colors by clicking the gear icon in the nav bar',
              hex: '909090',
            }}
            setClipboardColor={() => { return; }}
            session={session}
          />
        }
      </ul>
    </main>
  );
}

export default ColorSorter;
