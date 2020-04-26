import React from 'react';

export const ColorCell = ({ ...props }) => {
  const { color, setClipboardColor } = props;

  const handleClick = () => {
    setClipboardColor(color);
  }

  return (
    <div className="c-color-grid__item l-flex l-absolute-center"
      onClick={handleClick}
      style={{
        backgroundColor: `#${color.hexVal}`,
      }}>
      <span className="c-color-grid__item-text"
      >{color.hexVal}</span>
    </div >
  );
}

export default ColorCell;
