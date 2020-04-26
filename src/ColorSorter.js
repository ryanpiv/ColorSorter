import React, { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import ColorCell from './components/ColorCell/ColorCell';
import { colorObj, constructColor, sortColorsByHue } from './components/ColorCell/ColorSort';

export const ColorSorter = ({ ...props }) => {
  const [urlParams, setUrlParams] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [clipboardColor, setClipboardColor] = useState();
  const [colorsHistory, setColorsHistory] = useState([]);

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
      const tempColorsHistory = [...colorsHistory];
      tempColorsHistory.push(clipboardColor);
      setColorsHistory(tempColorsHistory);
    }
  }, [clipboardColor])

  return (
    <main className="c-color-sorter">
      <div className="c-color-copy l-flex l-absolute-center u-height-0 u-width-0">
        <span className="c-color-copy__value-container l-flex l-absolute-center">
          <p className="c-color-copy__value"></p>
        </span>
      </div>
      <Nav colorsHistory={colorsHistory} setClipboardColor={setClipboardColor} />
      <div className="c-color-grid l-flex u-width-100 u-height-100-vh">
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
