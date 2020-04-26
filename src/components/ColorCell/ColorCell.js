import React from 'react';
import { copyTextToClipboard } from './Copy';

export const ColorCell = ({ ...props }) => {
  const { color, setClipboardColor } = props;

  const handleClick = () => {
    setClipboardColor(color);
  }

  const copyColor = (bgColor) => {
    let msg = copyTextToClipboard(bgColor);
    if (msg) { console.log(msg); };
  };

  return (
    <div className="c-color-grid__item l-flex l-absolute-center"
      style={{
        backgroundColor: `#${color.hexVal}`,
      }}>
      <span className="c-color-grid__item-text"
        onClick={handleClick}
      >{color.hexVal}</span>
    </div >
  );
}

export default ColorCell;
