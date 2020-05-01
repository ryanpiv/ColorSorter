import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import ColorCell from './components/ColorCell/ColorCell';
import ModalSettings from './components/Modals/ModalSettings'
import { colorObj, constructColor, sortColors } from './components/ColorCell/ColorSort';
import { fallbackCopyTextToClipboard } from './components/Utils/Utils';

export const ColorSorter = ({ ...props }) => {
  const previousSession = props;
  const [urlParams, setUrlParams] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [clipboardColor, setClipboardColor] = useState();
  const [colorsHistory, setColorsHistory] = useState([]);
  const [session, setSession] = useState(previousSession);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCopyActive, setIsCopyActive] = useState(false);
  const isCopyActiveClass = isCopyActive === true ? ' is-shown' : '';

  useEffect(() => {
    setUrlParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    localStorage.setItem('color-sorter', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    let formattedColors = [];

    urlParams.forEach((value, key) => {
      let color = colorObj(value, key);
      formattedColors.push(constructColor(color));
    });

    formattedColors = sortColors([...formattedColors]);

    setColorsArray(formattedColors);
    setSession({
      ...session,
      session: {
        ...session.colors,
        colors: formattedColors
      }
    }
    )
  }, [urlParams]);

  useEffect(() => {
    if (clipboardColor) {
      copyText(clipboardColor.hexVal);
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
    setColorsHistory([...colorsHistory].push(clipboardColor));
    animateCopiedText();
  };

  return (
    <main className={`c-color-sorter${isSettingsModalOpen ? ' is-blurred' : ''}`}>
      <ModalSettings
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        session={session}
        setSession={setSession}
        setUrlParams={setUrlParams}
      />
      <div className={`c-color-copy${isCopyActiveClass} l-flex l-absolute-center`}
        style={{
          backgroundColor: clipboardColor && `#${clipboardColor.hexVal}`,
        }} >
        <span className="c-color-copy__value-container l-flex l-absolute-center">
          <p className="c-color-copy__value">Copied: #{clipboardColor && clipboardColor.hexVal}</p>
        </span>
      </div>
      <Nav colorsHistory={colorsHistory}
        setClipboardColor={setClipboardColor}
        setIsSettingsModalOpen={setIsSettingsModalOpen} />
      <div className="c-color-grid l-flex">
        {colorsArray && colorsArray.map((color, i) => {
          return <ColorCell
            color={color}
            setClipboardColor={setClipboardColor}
            key={i} />
        })}
        {colorsArray.length === 0 &&
          <ColorCell
            color={{
              name: 'Try loading some colors by clicking the gear icon in the nav bar',
              hexVal: '909090',
            }}
            setClipboardColor={() => { return; }}
          />
        }
      </div>
    </main>
  );
}

export default ColorSorter;
