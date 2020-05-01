import React from 'react';

export const ColorCell = ({ ...props }) => {
  const { color, setClipboardColor, session } = props;

  const handleClick = () => {
    setClipboardColor(color);
  }

  return (
    <div className="c-color-grid__item l-flex l-absolute-center"
      onClick={handleClick}
      style={{
        backgroundColor: `#${color.hexVal}`,
      }}>
      <span className="c-color-grid__item-text">{color.name}</span>
    </div >
  );
}

export default ColorCell;
