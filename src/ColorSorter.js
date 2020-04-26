import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import ColorCell from './components/ColorCell/ColorCell';
import { colorObj, constructColor, sortColorsByHue } from './components/ColorCell/ColorSort';
import { fallbackCopyTextToClipboard } from './components/Utils/Utils';

export const ColorSorter = ({ ...props }) => {
  const [urlParams, setUrlParams] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [clipboardColor, setClipboardColor] = useState();
  const [colorsHistory, setColorsHistory] = useState([]);
  const [isCopyActive, setIsCopyActive] = useState(false);
  const isCopyActiveClass = isCopyActive === true ? ' is-shown' : '';

  useEffect(() => {
    setUrlParams(new URLSearchParams(window.location.search));
    // addClassListener('click', '.js-grid-item', (event) => {
    //   let bgColor = findColorFromDiv(event);
    //   bgColor = hexFromRGB(bgColor);
    //   copyColor(bgColor);
    //   addColorToHistory(bgColor);
    // });
  }, []);

  useEffect(() => {
    let colorArray = [];
    let formattedColors = [];

    urlParams.forEach((value, key) => {
      let color = colorObj(value, key);
      colorArray.push(color);
    });

    colorArray.forEach((color) => {
      formattedColors.push(constructColor(color));
    });

    formattedColors = sortColorsByHue(formattedColors);

    setColorsArray(formattedColors);
  }, [urlParams]);

  useEffect(() => {
    console.log(clipboardColor);
    if (clipboardColor) {
      copyText(clipboardColor.hexVal);

      const tempColorsHistory = [...colorsHistory];
      tempColorsHistory.push(clipboardColor);
      setColorsHistory(tempColorsHistory);
    }
  }, [clipboardColor])

  const animateCopiedText = () => {
    setIsCopyActive(true);
    setTimeout(() => {
      setIsCopyActive(false);
    }, 800);
  }

  const copyText = (text) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      animateCopiedText();
    }
    navigator.clipboard.writeText(text).then(function () {
      console.log('copied: ', text);
      animateCopiedText();
    }, function (err) {
      alert('Async: Could not copy text: ', err);
    });
  };

  return (
    <main className="c-color-sorter">
      <div className={`c-color-copy${isCopyActiveClass} l-flex l-absolute-center`}
        style={{
          backgroundColor: clipboardColor && `#${clipboardColor.hexVal}`,
        }} >
        <span className="c-color-copy__value-container l-flex l-absolute-center">
          <p className="c-color-copy__value">{clipboardColor && clipboardColor.hexVal}</p>
        </span>
      </div>
      <Nav colorsHistory={colorsHistory} setClipboardColor={setClipboardColor} />
      <div className="c-color-grid l-flex">
        {colorsArray && colorsArray.map((color, i) => {
          return <ColorCell
            color={color}
            setClipboardColor={setClipboardColor}
            key={i} />
        })}
      </div>
    </main>
  );
}

export default ColorSorter;
